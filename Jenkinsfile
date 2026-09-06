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
                sh 'npm install'
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
                sleep 5
                curl localhost:3000
                curl localhost:3000/health
                '''
            }
        }
    }
}
