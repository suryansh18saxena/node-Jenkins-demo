pipeline {
    agent any

    environment {
        PORT = '3000'
        APP_NAME = 'Jenkins Node App'
    }

    stages {

        stage('Clone') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/tanishq980/node-jenkins-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Test') {
            steps {
                sh 'node --check app.js'
            }
        }

        stage('Run Application') {
            steps {
                sh '''
                node app.js > app.log 2>&1 &
                APP_PID=$!
                sleep 5

                curl --fail http://localhost:3000
                curl --fail http://localhost:3000/health

                kill $APP_PID
                '''
            }
        }
    }

    post {
        success {
            echo 'BUILD SUCCESS: Node.js CI pipeline completed successfully.'
        }

        failure {
            echo 'BUILD FAILED: Check the console output for errors.'
        }

        always {
            echo "Build status: ${currentBuild.currentResult}"
        }
    }
}
