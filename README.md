# g.js
g.js is a javascript framework that solves several routine problems in the development of web apps.

# import

```
<script defer type="text/javascript" src="g.js"></script>
```

# tips

1) You need a controller to of g.js to manage content. ```<gjs-c> ... </gjs-c>```
2) ```G``` is the global variable of g.js

## Create dynamic model by HTML

```
<input type="text" gjs-m="welcomeModel" value="That's the initial value!">
g=welcomeModel
```

When you add ```gjs-m=welcomeModel``` to an input you create and model with initial value of input (or null by default).
The ```g=welcomeModel``` is like a "print", show de value of model.

Result:

![alt text](https://i.imgur.com/OYN2VJp.png)

## Creating dynamic model by Javascript

Javascript:

```
    let welcomeModel = new GjsModel({var:'welcomeModel', value:'Initial value'});
```

HTML:

```
g=welcomeModel
```

## Manipulating existing Model by Javascript:

```
    let welcomeModel = new GjsModel({var:'welcomeModel', value:'Initial value'});
    welcomeModel.set("new value");
    
    or 
    
    G.Models("welcomeModel").set("new value");
```

# Examples

https://github.com/Iazzetta/g.js/tree/master/examples