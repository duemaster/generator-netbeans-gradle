# generator-netbeans-gradle

A generator to create gradle build scripts for Netbeans 8.0.2


## How to use

1. Install yo using npm
```bash
npm install -g yo
```

2. Install generator
```bash
npm install -g generator-netbeans-gradle
```

3. Enter Netbeans Project Directory and run
```
yo netbeans-gradle
```

4. Follow the prompts on screen



## Configuration

This generator generates the gradle files for the following folder structure.

1. Application Client
2. Application Interface
3. Application Files (includes ejb and war)

This generator assumes the following naming convention for ease of use.

Given Project Name is "SampleProject".

1. ApplicationClient - SampleProjectClient
2. ApplicationInterface - SampleProjectInterface
3. Application - SampleProject

The following package conventions is also required
1. SessionBeans - sessionbean
2. Entity - entity
3. Servelets - servlet
4. Message Beans - messagebean



### Optional Configuration
1. Set persistance.xml to use `create` setting. This is because Virtualbeans internally provides a `drop-table` option.