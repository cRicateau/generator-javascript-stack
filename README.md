## Requirements
You need some tools to
+ VirtualBox
+ vagrant
+ [Ansible 2](http://docs.ansible.com/ansible/intro_installation.html#getting-ansible)
+ nodejs
+ Loopback-cli `npm install -g loopback-cli`
+ Yeoman `npm install -g yeoman`

## Installation:

Add the local generator:

```
git clone https://github.com/cRicateau/generator-javascript-stack
cd generator-javascript-stack
npm link
```

In a new empty directory created for your app:

- **Add a Loopback app**
```
yo ansible-loopback-react-redux:backend
```

- **Add the react-redux starter kit**

```
yo ansible-loopback-react-redux:frontend
```

- **Add the provisioning and the deployment tool with shipit**
```
yo ansible-loopback-react-redux:provisioning
yo ansible-loopback-react-redux:deployment
```

## Installation

## Usage
```
vagrant up
```

Then, you can run your server
```
vagrant ssh
sudo su - www-data
cd <app-name>/current
npm start
```

Now, you are set up !

You can browse a static page served by Loopback at the following url : `http://10.0.0.10`
You can also browse Loopback's explorer at : `http://10.0.0.10/explorer`

## The provisioning

To provision a remote machine, you need to add your ssh public key to the `~/.ssh/authorized_keys` file of the root user of the remote machine

You can now provision your remote staging machine :
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

:bangbang: On Ubuntu 16.04, python is not installed by default, so you can't use Ansible to provision it and get the following error message : `/bin/sh: 1: /usr/bin/python: not found`. If so, ssh to the machine and install python-simplejson.
```
sudo apt-get update
sudo apt-get install python-simplejson
```
Now, you can relaunch
```
ansible-playbook -i devops/provisioning/hosts/staging devops/provisioning/playbook.yml
```

Then, you have to ssh to your machine as root and add your ssh key to the www-data user to be able to run the server and deploy as www-data
```
sudo su - www-data
vim .ssh/authorized_keys
```
Then, paste your ssh public key to this file

## The deployment
You can now setup the deployment in production and staging with the following command:
```
yo loopback-ansible:deployment
```

To deploy a provisionned staging machine, run:
```
./node_modules/.bin/shipit staging deploy
```
To deploy a provisionned production machine, run:
```
./node_modules/.bin/shipit prod deploy
```

## Roadmap
+ Add an admin generator
