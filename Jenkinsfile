/*
 * Jenkins CI pipeline - Playwright_Final_Framework
 * Repository: https://github.com/Yogesh7799/Playwright_Final_Framework-.git
 *
 * ---------------------------------------------------------------------------
 * JOB SETUP (Jenkins UI)
 *   New Item -> Pipeline
 *     Definition ....... Pipeline script from SCM
 *     SCM .............. Git
 *     Repository URL ... https://github.com/Yogesh7799/Playwright_Final_Framework-.git
 *     Branch Specifier . */main
 *     Script Path ...... Jenkinsfile
 *
 * AGENT
 *   Runs on the built-in Windows node, so no Docker is required. It relies on
 *   the NodeJS tool named "node.js" that is already configured under
 *   Manage Jenkins -> Tools. If that tool is ever renamed, update the tools block.
 *
 * CREDENTIAL
 *   Manage Jenkins -> Credentials -> add "Username with password" with the id
 *   "demoblaze-login"; it is bound to LOGIN_USERNAME / LOGIN_PASSWORD.
 *
 * REPORTS
 *   JUnit results use built-in support. The Allure report uses the installed
 *   Allure Jenkins Plugin (its commandline tool is configured as "default").
 *
 * NOTE
 *   Playwright browsers are installed by this pipeline; that download is skipped
 *   when the browser is already present on the node.
 * ---------------------------------------------------------------------------
 */

pipeline {

  agent any

  tools {
    // Must match Manage Jenkins -> Tools -> NodeJS installations.
    nodejs 'node.js'
  }

  options {
    timestamps()
    timeout(time: 30, unit: 'MINUTES')
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '20', artifactNumToKeepStr: '10'))
  }

  parameters {
    string(name: 'GREP', defaultValue: '@master',
           description: 'Playwright --grep tag filter. Leave empty to run every test.')
    choice(name: 'PROJECT', choices: ['chromium'],
           description: 'Playwright project to execute.')
    string(name: 'RETRIES', defaultValue: '2',
           description: 'Retries applied to a failing test.')
    string(name: 'WEB_APP_URL', defaultValue: 'https://www.demoblaze.com/index.html',
           description: 'Application under test, exposed to Playwright as baseURL.')
  }

  environment {
    // Drives the CI branches in playwright.config.ts: headless, retries, workers,
    // forbidOnly.
    CI = 'true'
    // Elvis guards against params being unset on a job's very first run.
    WEB_APP_URL = "${params.WEB_APP_URL ?: 'https://www.demoblaze.com/index.html'}"
  }

  stages {

    stage('Toolchain') {
      steps {
        bat 'node --version && npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        bat 'npm ci'
        bat 'npx playwright install chromium'
      }
    }

    stage('Run tests') {
      steps {
        script {
          def grep = (params.GREP ?: '').trim()
          def grepArg = grep ? "--grep=${grep}" : ''
          withCredentials([usernamePassword(
              credentialsId: 'demoblaze-login',
              usernameVariable: 'LOGIN_USERNAME',
              passwordVariable: 'LOGIN_PASSWORD')]) {
            bat """
              if exist allure-results rmdir /s /q allure-results
              if exist reports rmdir /s /q reports
              if exist test-results rmdir /s /q test-results
              npx playwright test --project=${params.PROJECT} --retries=${params.RETRIES} ${grepArg}
            """
          }
        }
      }
    }
  }

  post {
    always {
      junit testResults: 'reports/results.xml', allowEmptyResults: true
      allure includeProperties: false,
             jdk: '',
             properties: [],
             reportBuildPolicy: 'ALWAYS',
             results: [[path: 'allure-results']]
      archiveArtifacts artifacts: 'reports/**, allure-results/**, test-results/**',
                       allowEmptyArchive: true,
                       fingerprint: true
    }
    failure {
      echo 'Playwright run failed - check the Allure report and the archived traces/videos.'
    }
  }
}
