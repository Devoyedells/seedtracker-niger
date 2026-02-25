# Generate User Data Generator Prompt

Please act as an AI data generator. I need you to generate a strictly valid JSON array containing exactly **100 user objects** for a seed value chain application in Nigeria. 

The application tracks actors in the agricultural seed value chain across three states: **Ekiti**, **Anambra**, and **Niger**.

## Core Requirements

1. **Output Format**: Strictly return ONLY the raw JSON array. Do not include markdown formatting like ````json`, do not include introductory text, and do not include trailing explanations. The output must be directly parseable by `JSON.parse()`.
2. **Total Count**: Exactly 100 users.
3. **Data Realism**:
   - Fields should contain realistic, Nigerian-context names, organizations, and addresses.
   - Coordinates (`lat` and `lng`) MUST be real, accurate geographic coordinates that actually fall within the specified `registrationState` (Ekiti, Anambra, or Niger). Do not use generic or random numbers.

## User Roles & Distribution

### 1. Administrators (4 users)
You must include exactly one of each of the following administrators:
* **Platform Admin**: `role: "admin"`, `email: "admin@seedtracker.ng"`, `fullName: "System Administrator"`, `registrationState: "Abuja"`
* **Ekiti Admin**: `role: "ekadmin"`, `email: "ekadmin@seedtracker.ng"`, `fullName: "Ekiti State Coordinator"`, `registrationState: "Ekiti"`, `actorType: "others"`
* **Anambra Admin**: `role: "anadmin"`, `email: "anadmin@seedtracker.ng"`, `fullName: "Anambra State Coordinator"`, `registrationState: "Anambra"`, `actorType: "others"`
* **Niger Admin**: `role: "ngadmin"`, `email: "ngadmin@seedtracker.ng"`, `fullName: "Niger State Coordinator"`, `registrationState: "Niger"`, `actorType: "others"`

All admins should have the password: `"admin123"`.

### 2. Regular Actors (96 users)
The remaining 96 users should have `role: "user"`.
They should be approximately evenly distributed across the three states (`Ekiti`, `Anambra`, `Niger`).
They should have the password: `"password123"`.

Distribute their `actorType` organically among the following types. Below each type are the specific profile fields you MUST populate with highly realistic, contextual data.

#### `actorType: "producer"` (Seed Producer)
Fields to include: `licenseNumber` (e.g., NASC/2023/...), `yearsOfExperience` (number), `seedVarieties` (array of strings, e.g., ["Maize", "Rice"]), `certifications` (array of strings)

#### `actorType: "input_provider"` (Input Provider)
Fields to include: `productsHandled` (array of strings), `suppliers` (array of strings), `areasOfCoverage` (array of strings)

#### `actorType: "aggregator"` OR `actorType: "dealer"` (Aggregator / Dealer & Retailer)
Fields to include: `storageCapacityMT` (number), `productsHandled` (array of strings), `areasOfCoverage` (array of strings)

#### `actorType: "offtaker"` (Offtaker)
Fields to include: `productsHandled` (array of strings), `storageCapacityMT` (number), `areasOfCoverage` (array of strings)

#### `actorType: "processor"` (Processor)
Fields to include: `processingCapacityMT` (number), `storageCapacityMT` (number), `productsHandled` (array of strings)

#### `actorType: "farmer"` (Farmer / Cooperative)
Fields to include: `farmSizeHectares` (number), `farmerGroupSize` (number), `cropsGrown` (array of strings)

## Standard Fields for ALL users
In addition to the specific fields above, EVERY user must have:
* `email`: (unique, realistic email)
* `password`: (use "password123" for regular users, "admin123" for admins)
* `fullName`: (real Nigerian names, e.g., "Oluwaseun Adeyemi")
* `organization`: (realistic cooperative or company names)
* `phone`: (Nigerian format, e.g., "+234...")
* `registrationState`: ("Ekiti", "Anambra", or "Niger")
* `address`: (detailed street address matching the state)
* `lat`: (string format, real coordinate from the state)
* `lng`: (string format, real coordinate from the state)
* `bio`: (2-3 sentences max)

Ensure the final JSON array is valid.
