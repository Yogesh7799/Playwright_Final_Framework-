/*
 * Jenkins CI pipeline - Playwright_Final_Framework
 * Repository: https://github.com/Yogesh7799/Playwright_Final_Framework-.git
 *
 * ---------------------------------------------------------------------------
 * JOB SETUP
 *   New Item -> Pipeline  (a Multibranch Pipeline also works)
 *     Definition ....... Pipeline script from SCM
 *     SCM .............. Git
 *     Repository URL ... https://github.com/Yogesh7799/Playwright_Final_Framework-.git
 *     Branch Specifier . */main
 *     Script Path ...... Jenkinsfile
 *
 * JENKINS REQUIREMENTS
 *   Plugins .... Docker Pipeline, Allure Jenkins Plugin
 *   Agent ...... a Docker daemon reachable from the Jenkins agent
 *   Credential . "demoblaze-login"  (kind: Username with password)
 *                  username -> LOGIN_USERNAME
 *                  password -> LOGIN_PASSWORD
 *
 * NOTE: the image tag below must track the @playwright/test version pinned in
 *       package.json. Browsers ship inside this image, so the pipeline never
 *       needs a `playwright install` step.
 * ---------------------------------------------------------------------------
 */

pipeline {

  agent {
    docker {
      image 'mcr.microsoft.com/playwright:v1.64.0-jammy'
      // --ipc=host gives Chromium a usable /dev/shm inside the container.
      // -u root    lets npm write into the Jenkins-mounted workspace.
      args '--ipc=host -u root'
    }
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
        sh 'node --version && npm --version'
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright --version'
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
            sh """
              rm -rf allure-results reports test-results
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
