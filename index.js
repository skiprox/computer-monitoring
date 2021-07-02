'use strict';
const chalk = require('chalk');
const ora = require('ora');
const moment = require('moment');
const robot = require('robotjs');
const { table } = require('table');

class TimeFiles {
  /**
   * Instantiation
   */
  constructor() {
    this.run();
  }
  /**
   * Run the program
   */
  run() {
    const monitorSpinner = ora(
      'Monitoring all current activity...'
    );
    monitorSpinner.color = 'green';
    monitorSpinner.start();
    setTimeout(() => {
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
          console.log(table([
            [
              '12:42:37am',
              chalk.bgRed('nothing')
            ],
            [
              '12:42:44am',
              chalk.bgGreen('activity')
            ]
          ]));
          setTimeout(() => {
            this.run();
          }, 5000);
        }, 2000);
      }, 2000);
    }, 5000);
  }
}

new TimeFiles();
