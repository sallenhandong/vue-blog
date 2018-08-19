#### With Simple and github pages you can easily create your static blog. 
#### Here is what you need to do.
#### 1. Create a repo named your_user_name.github.io
This my url you can clone https://github.com/sallenhandong/sallenhandong.github.io  
 - you need edit cofig.json  
 - Tags.type needs to correspond to d.type.  
```
{
  "d": [
    {
      "gitname": "ios.md",
      "type": 0,
      "title": "ios",
      "tags": ["文章", "JS"],
      "pic": " ",
      "info": "ios",
      "date": "2018/02/28"
    }
    
  ],
  "t": [
    {
      "tags": [{
        "name":"iOS",
        "count":1,
        "type":0
      }, 
        {
        "name":"JavaScript",
        "count":0,
        "type":0
      }]
    }
    
  ]
}

```
#### 2. clone this project and build 
#### you need install node  and yarn
## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn run serve
```

### Compiles and minifies for production
```
yarn run build
```
