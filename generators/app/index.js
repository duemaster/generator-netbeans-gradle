'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the ${chalk.red('generator-netbeans-gradle')} generator!`)
    );

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'What is your project name?',
        default: 'Test_Project'
      },
      {
        type: 'input',
        name: 'jndiName',
        message: 'What is the name of the JNDI?',
        default: 'jdbc/testApp'
      },
      {
        type: 'input',
        name: 'connectionPoolName',
        message: 'What is the name of your connection pool?',
        default: 'testConnectionPool'
      },
      {
        type: 'input',
        name: 'databaseName',
        message: 'What is the name of your database?',
        default: 'testDB'
      },
      {
        type: 'input',
        name: 'databaseUserName',
        message: 'What is the username of your database?',
        default: 'username'
      },
      {
        type: 'input',
        name: 'databasePassword',
        message: 'What is the password of your database?',
        default: 'password'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this._copyVirtualBeansConfig();

    this._copyBaseProject();
    this._copyAppClient();
    this._copyAppInterface();

    this._copyMainApp();
    this._copyMainAppEJB();
    this._copyMainAppWar();
  }

  _copyBaseProject() {
    const base = "";
    this._copyGradleFiles("", "");
  }

  _copyMainApp() {
    const appMainDir = `${this.props["projectName"]}/`;
    this._copyGradleFiles("mainproject/", appMainDir);
  }

  _copyMainAppEJB() {
    const appMainEJBDir = `${this.props["projectName"]}/${this.props["projectName"]}-ejb/`;
    this._copyGradleFiles("mainproject/mainproject-ejb/", appMainEJBDir);
  }

  _copyMainAppWar() {
    const appMainWarDir = `${this.props["projectName"]}/${this.props["projectName"]}-war/`;
    this._copyGradleFiles("mainproject/mainproject-war/", appMainWarDir);
  }

  _copyAppInterface() {
    const appInterfaceDir = `${this.props["projectName"]}Interface/`;
    this._copyGradleFiles("appinterface/", appInterfaceDir);
  }

  _copyAppClient() {
    const appClientDir = `${this.props["projectName"]}Client/`;
    this._copyGradleFiles("appclient/" ,appClientDir);
  }

  _copyGradleFiles(templateDirectoryPath ,targetDirectoryPath) {
    // Copy base gradle file
    this.fs.copy(
      this.templatePath(`${templateDirectoryPath}.gradle`),
      this.destinationPath(`${targetDirectoryPath}.gradle`)
    );

    this.fs.copy(
      this.templatePath(`${templateDirectoryPath}gradle`),
      this.destinationPath(`${targetDirectoryPath}gradle`)
    );

    this.fs.copy(
      this.templatePath(`${templateDirectoryPath}gradlew`),
      this.destinationPath(`${targetDirectoryPath}gradlew`)
    );

    this.fs.copy(
      this.templatePath(`${templateDirectoryPath}gradlew.bat`),
      this.destinationPath(`${targetDirectoryPath}gradlew.bat`)
    );

    this.fs.copyTpl(
      this.templatePath(`${templateDirectoryPath}build.gradle`),
      this.destinationPath(`${targetDirectoryPath}build.gradle`),
      {
        "projectName": this.props["projectName"],
        "projectNameSmall": this.props["projectName"].toLowerCase()
      }
    );

    this.fs.copyTpl(
      this.templatePath(`${templateDirectoryPath}settings.gradle`),
      this.destinationPath(`${targetDirectoryPath}settings.gradle`),
      {
        "projectName": this.props["projectName"],
        "projectNameSmall": this.props["projectName"].toLowerCase()
      }
    );
  }

  _copyVirtualBeansConfig() {
    // Create Configuration File
    this.fs.copyTpl(
      this.templatePath('.virtual-beans/config.json'),
      this.destinationPath('.virtual-beans/config.json'),
      {
        "jndiName": this.props["jndiName"],
        "connectionPoolName": this.props["connectionPoolName"],
        "databaseName": this.props["databaseName"],
        "databaseUserName": this.props["databaseUserName"],
        "databasePassword": this.props["databasePassword"]
      }
    );
  }
};
