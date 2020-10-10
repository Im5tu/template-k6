# K6 Performance Test Suite Template
This is a simple a K6 performance test suite template. Some of the common functionality that's required for tracking errors has already been taken care of for you, allowing you to concentrate on building your performance tests.

This repository assumes that you have a basic knowledge of docker, javascript and k6.

## Build & Run

If you're on Windows, simply set the variables for `K6_HOSTENV` and `K6_SCRIPT` to your target values and run `.\run.ps1`. Otherwise, see the instructions below for a manual build and run.

### Build

```bash
docker build -t test .
```

### Run

```bash
docker run -it -e K6_HOSTENV=qa -e K6_SCRIPT=TEMPLATE.js test
```