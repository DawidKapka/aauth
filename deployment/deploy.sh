if [ -d "/root/aauth/aauth" ]; then
    cd aauth
    echo "pulling updates..."
    git pull
else
    echo "cloning projects..."
    git clone git@github.com:DawidKapka/aauth.git
    cd aauth
fi
cd backend-aauth
docker stop aauth
docker rm aauth
docker build -t aauth .
docker run --name aauth -p 3000:3000 -d aauth
