---
sidebar_position: 3
---

# Running Composable UI in Docker

You can run the Composable UI app using Docker to simplify the setup process and avoid concerns about local dependencies.

1. Clone, build and run the Docker image:

   ```sh
   git clone https://github.com/composable-com/composable-ui
   cd composable-ui
   sh docker.sh build
   sh docker.sh run
   ```

2. After successfully running the Composable UI application through Docker, open your web browser and enter the following URL in the address bar: 

   [http://localhost:3000/](http://localhost:3000)