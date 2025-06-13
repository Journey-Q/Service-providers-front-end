import requests
import unittest
import os
import json
from datetime import datetime

class JourneyQAPITester(unittest.TestCase):
    def __init__(self, *args, **kwargs):
        super(JourneyQAPITester, self).__init__(*args, **kwargs)
        # Get the backend URL from the frontend .env file
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    self.base_url = line.strip().split('=')[1]
                    break
        
        # Ensure the base URL doesn't end with a slash
        if self.base_url.endswith('/'):
            self.base_url = self.base_url[:-1]
        
        print(f"Using backend URL: {self.base_url}")

    def test_root_endpoint(self):
        """Test the root API endpoint"""
        url = f"{self.base_url}/api"
        print(f"Testing root endpoint: {url}")
        
        try:
            response = requests.get(url)
            print(f"Status code: {response.status_code}")
            print(f"Response: {response.text}")
            
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertEqual(data.get("message"), "Hello World")
            print("✅ Root endpoint test passed")
        except Exception as e:
            print(f"❌ Root endpoint test failed: {str(e)}")
            raise

    def test_status_endpoint_post(self):
        """Test creating a status check"""
        url = f"{self.base_url}/api/status"
        print(f"Testing POST status endpoint: {url}")
        
        data = {
            "client_name": f"test_client_{datetime.now().strftime('%Y%m%d%H%M%S')}"
        }
        
        try:
            response = requests.post(url, json=data)
            print(f"Status code: {response.status_code}")
            print(f"Response: {response.text}")
            
            self.assertEqual(response.status_code, 200)
            response_data = response.json()
            self.assertEqual(response_data.get("client_name"), data["client_name"])
            self.assertIsNotNone(response_data.get("id"))
            self.assertIsNotNone(response_data.get("timestamp"))
            print("✅ POST status endpoint test passed")
        except Exception as e:
            print(f"❌ POST status endpoint test failed: {str(e)}")
            raise

    def test_status_endpoint_get(self):
        """Test getting status checks"""
        url = f"{self.base_url}/api/status"
        print(f"Testing GET status endpoint: {url}")
        
        try:
            response = requests.get(url)
            print(f"Status code: {response.status_code}")
            
            self.assertEqual(response.status_code, 200)
            data = response.json()
            self.assertIsInstance(data, list)
            if len(data) > 0:
                print(f"Found {len(data)} status checks")
                # Check the structure of the first item
                first_item = data[0]
                self.assertIsNotNone(first_item.get("id"))
                self.assertIsNotNone(first_item.get("client_name"))
                self.assertIsNotNone(first_item.get("timestamp"))
            else:
                print("No status checks found, but endpoint works")
            print("✅ GET status endpoint test passed")
        except Exception as e:
            print(f"❌ GET status endpoint test failed: {str(e)}")
            raise

def run_tests():
    """Run all the API tests"""
    print("Starting JourneyQ API Tests...")
    
    # Create a test suite
    suite = unittest.TestSuite()
    suite.addTest(JourneyQAPITester('test_root_endpoint'))
    suite.addTest(JourneyQAPITester('test_status_endpoint_post'))
    suite.addTest(JourneyQAPITester('test_status_endpoint_get'))
    
    # Run the tests
    runner = unittest.TextTestRunner(verbosity=2)
    result = runner.run(suite)
    
    # Print summary
    print("\n=== Test Summary ===")
    print(f"Tests run: {result.testsRun}")
    print(f"Errors: {len(result.errors)}")
    print(f"Failures: {len(result.failures)}")
    
    # Return success or failure
    return len(result.errors) == 0 and len(result.failures) == 0

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)
