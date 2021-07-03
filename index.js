'use strict';
// Requires
const chalk = require('chalk');
const ora = require('ora');
const moment = require('moment');
const robot = require('robotjs');
const { table } = require('table');
const keypress = require('keypress');

class TimeFiles {
  /**
   * Instantiation
   */
  constructor() {
    this.activity = [];
    this.keyPresses = [];
    this.inStream = null;
    this.addListeners();
    this.run();
  }
  /**
   * Set up listeners for key events
   */
  addListeners() {
    keypress(process.stdin);
    // listen for the "keypress" event
    process.stdin.on('keypress', (ch, key) => {
      if (key && key.ctrl && key.name == 'c') {
        process.exit();
      } else {
        this.keyPresses.push(key.name);
      }
    });
    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
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
    this.keyPresses = [];
  }
  stopMonitoringActivity() {
    const newMousePos = robot.getMousePos();
    const dist = Math.sqrt(
      Math.pow(newMousePos.x - this.currentMousePos.x, 2),
      Math.pow(newMousePos.y - this.currentMousePos.y, 2)
    );
    const keysPressed = this.keyPresses.length;
    const active = dist !== 0 || keysPressed !== 0;
    let activeDescription = '';
    if (active) {
      activeDescription = `Mouse moved ${dist} pixels during time period. ${this.keyPresses.length} keys pressed during this time period.`;
    } else {
      activeDescription = 'No activity logged during time period.';
    }
    this.activity.push([
      moment().format('hh:mm:ss a'),
      active ? chalk.bgGreen('active') : chalk.bgRed('inactive'),
      activeDescription
    ]);
  }
}

new TimeFiles();
