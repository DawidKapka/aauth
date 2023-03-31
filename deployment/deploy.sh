if [ -d "/root/aauth/aauth" ]; then
    cd ~/aauth/aauth
    echo "pulling updates..."
    git pull
else
    cd ~/aauth
    echo "cloning projects..."
    git clone git@github.com:DawidKapka/aauth.git
    cd ~/aauth/aauth
fi
cd ~/aauth/aauth/backend-aauth
docker stop aauth
docker rm aauth
docker build -t aauth .
docker run --name aauth -p 3000:3000 -d aauth
docker network connect aauth-network aauth
