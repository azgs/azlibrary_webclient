# azlibrary_webclient
Rudimentary admin client for the azlibrary_api. Meant primarily for testing. 

There's a lot of infrastructure here, but it all comes down to the form.html file in client/v1/collections. The rest is just express fluff that could be useful for a more featured client.

The form.html file uses Vue.js.

Usage: app [options]

Options:
```
  -V, --version                      output the version number
  -p, --port <port>                  Port to listen on (default: 4000)
  -l, --loglevel <loglevel>          Indicates logging level (error, warn, 
                                     info, verbose, debug, silly). Default is 
                                     info. (default: "info")
  -s, --servicelevel <servicelevel>  Indicates service level (prod, stage, 
                                     dev). Default is prod. (default: "prod")
  -h, --https <https>                Indicates whether to use https (true, 
                                     false). Default is false. (default: 
                                     "false")
  -h, --help                         output usage information
```


This application is deployed as a systemd service and can be controlled via:

```
$ systemctl start azlibrary_webclient.service
$ systemctl stop azlibrary_webclient.service
$ systemctl restart azlibrary_webclient.service
```
