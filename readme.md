#  DESCRIPTION

A simple parking  project

#  Installation

You'll need Node.js (which comes with npm) installed on your computer. From your command line:

```bash

# git clone repository
# Go to project folder
> cd parking

# Install dependencies needed for this project
> npm install

# Copy `.env.tpl` to `.env` then set the values accordingly


```

##  Run the API

And finally, run the app

```

> npm start

```

You should see a `Listening on port 3000.....` message in the log.


##  Usage

| ***HTTPMethod*** | ***Path***                                               | ***Desc***            | ***RequestBody***                   |
|------------------|----------------------------------------------------------|-----------------------|-------------------------------------|
| GET              | https://localhost:3000/available-parking-slot?entryPointId=1&vehicleType=M | Get available parking Spot                                  |                             |
| GET             | https://localhost:3000/parking-slots | Get all parkinng slots           |                                     |
| POST              | https://localhost:3000/park/vehicle/                               | Park vehicle      | { "entryPointId": 1, "spotId": 3, "vehicle": { "type": "M", "licenseNumber": "123","color": "blue" }}                                  |
| DELETE           | https://localhost:3000/park/vehicle/4000d99c-0e43-432b-aa3b-a10dd53578ff           | Remove vehicle parked cart |{ "startTime": "2022-06-07 07:00", "endTime": "2022-06-08 09:40" } |
| POST             | https://localhost:3000/parking-slots                      | Create parking spots              |                                     |         