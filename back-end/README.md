Deploy robisz uruchamiając skrypt /.deploy.sh albo

mvn compile && mvn package && sls deploy
 z parametrami (polecam)
mvn compile -q && mvn package -q && sls deploy --aws-s3-accelerate --conceal
