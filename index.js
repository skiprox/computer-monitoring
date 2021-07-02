'use strict';
// Requires
const chalk = require('chalk');
const ora = require('ora');
const moment = require('moment');
const robot = require('robotjs');
const { table } = require('table');
const readline = require('readline');
const { Readable } = require('stream');

class TimeFiles {
  /**
   * Instantiation
   */
  constructor() {
    this.activity = [];
    this.inStream = null;
    this.setupKeyStream();
    this.run();
  }
  setupKeyStream() {}
  /**
   * Run the program
   */
  run() {
    const monitorSpinner = ora('Monitoring all current activity...');
    monitorSpinner.color = 'green';
    monitorSpinner.start();
    this.startMonitoringActivity();
    setTimeout(() => {
      this.stopMonitoringActivity();
      monitorSpinner.succeed();
      const saveSpinner = ora(
        `Writing activity to disk... ${chalk.red(
          'Warning: do not exit program.'
        )}`
      );
      saveSpinner.color = 'green';
      saveSpinner.start();
      setTimeout(() => {
        saveSpinner.succeed();
        const analyzeSpinner = ora(
          'Running analysis on all activity performed...'
        );
        analyzeSpinner.color = 'green';
        analyzeSpinner.start();
        setTimeout(() => {
          analyzeSpinner.succeed();
          console.log(table(this.activity));
          setTimeout(() => {
            this.run();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 27000);
  }
  startMonitoringActivity() {
    this.currentMousePos = robot.getMousePos();
  }
  stopMonitoringActivity() {
    const newMousePos = robot.getMousePos();
    const dist = Math.sqrt(
      Math.pow(newMousePos.x - this.currentMousePos.x, 2),
      Math.pow(newMousePos.y - this.currentMousePos.y, 2)
    );
    this.activity.push([
      moment().format('hh:mm:ss a'),
      dist === 0 ? chalk.bgRed('inactive') : chalk.bgGreen('active'),
      dist === 0 ? 'No activity detected during time period.' : `Mouse moved ${dist} pixels during time period.`
    ]);
  }
}

new TimeFiles();
