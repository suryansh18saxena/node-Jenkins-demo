pipeline {
    agent any

    environment {
        PORT = '3000'
        APP_NAME = 'Jenkins Node App'
    }

    stages {

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
                set -e
                trap '[ -n "$APP_PID" ] && kill $APP_PID 2>/dev/null || true' EXIT

                node app.js > app.log 2>&1 &
                APP_PID=$!

                for i in $(seq 1 10); do
                    if ! kill -0 $APP_PID 2>/dev/null; then
                        echo "App process exited early, see app.log:"
                        cat app.log
                        exit 1
                    fi
                    if curl --silent --fail http://localhost:$PORT/health > /dev/null; then
                        break
                    fi
                    sleep 1
                done

                curl --fail http://localhost:$PORT
                curl --fail http://localhost:$PORT/health
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
