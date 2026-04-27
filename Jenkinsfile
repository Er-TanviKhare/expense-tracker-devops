pipeline {
    agent any

        environment {
            DOCKER_USER = "ertanvi"
        }

    stages {

        stage('Clone Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Er-TanviKhare/expense-tracker-devops.git'
            }
        }

        stage('Build Backend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/backend -f docker/backend.Dockerfile .'
            }
        }

        stage('Build Frontend Image') {
            steps {
                sh 'docker build -t $DOCKER_USER/frontend -f docker/frontend.Dockerfile .'
            }
        }

        stage('Docker Login') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-creds', usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                    sh 'echo $PASS | docker login -u $USER --password-stdin'
                }
            }
        }

        stage('Push Images') {
            steps {
                sh 'docker push $DOCKER_USER/backend'
                sh 'docker push $DOCKER_USER/frontend'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh 'docker run -d -p 5000:5000 $DOCKER_USER/backend'
                sh 'docker run -d -p 3000:80 $DOCKER_USER/frontend'
            }
        }
    }
}