pipeline {
  agent {
    docker {
      image 'node:7-alpine'
    }
    
  }
  stages {
    stage('error') {
      steps {
        sh 'npm install'
      }
    }
  }
}