
# Reference

According to `Martin Fowler's` article:

  - `Dummy` objects are passed around but never actually used. Usually they are just used to fill parameter lists.
  - `Fake` objects actually have working implementations, but usually take some shortcut which makes them not suitable for production (an in memory database is a good example).
  - `Stubs` provide canned answers to calls made during the test, usually not responding at all to anything outside what's programmed in for the test. Stubs may also record information about calls, such as an email gateway stub that remembers the messages it 'sent', or maybe only how many messages it 'sent'.
  - `Mocks` are what we are talking about here: objects pre-programmed with expectations which form a specification of the calls they are expected to receive.

# Style

Mocks vs Stubs = Behavioral testing vs State testing

# Principle

According to the principle of Test only one thing per test, there may be several stubs in one test, but generally there is only one mock.

# Lifecycle

## Test lifecycle with stubs:

  - Setup - Prepare object that is being tested and its stubs collaborators.
  - Exercise - Test the functionality.
  - Verify state - Use asserts to check object's state.
  - Teardown - Clean up resources.

## Test lifecycle with mocks:

  - Setup data - Prepare object that is being tested.
  - Setup expectations - Prepare expectations in mock that is being used by primary object.
  - Exercise - Test the functionality.
  - Verify expectations - Verify that correct methods has been invoked in mock.
  - Verify state - Use asserts to check object's state.
  - Teardown - Clean up resources.
