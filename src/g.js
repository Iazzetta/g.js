/**
 *
 * @name g.js
 * @version v1.0.0
 * @author Guilherme Iazzetta
 *
**/
let GTask;
class GjsTaskManager {
    constructor(edom) {
        this.edom = edom;
        this.list_tasks = [];
    }
    
    transform(){
        let new_dom = this.edom;
        for(let i in this.list_tasks){
            let task = this.list_tasks[i];
            new_dom = new_dom.replace('g=' + task.var, "<ginfo m=" + task.var + ">" + task.value + "</ginfo>");
        }
        document.querySelector('gjs-controller').innerHTML = new_dom;
    }
    
    add(model) {
        if (!this.list_tasks.includes(model)) {
            this.list_tasks.push(model);
            GTask.transform();
            this.apply();
            GTask.initObserver();
        }
    }
    
    update(model) {
        for (let i in this.list_tasks) {
            if (this.list_tasks[i].id === model.id) {
                this.list_tasks[i] = model;
                this.apply();
            }
        }
    }
    
    getList(){
        return self.list_tasks;
    }
    
    initObserver(){
        let _this = this;
        for (let i in this.list_tasks) {
            let task = this.list_tasks[i];
            if (task.tag_name === "input") {
                document.querySelector('[gjs-m="' + task.var + '"]').addEventListener('input', function (evt) {
                    task.set(this.value);
                    this.focus();
                });
                task.binded = true;
            }
        }
    }
    
    apply(){
        if (GTask && GTask.list_tasks.length > 0 ) {
            let edom_copy = GTask.edom;
            for (let i in GTask.list_tasks) {
                let task = GTask.list_tasks[i];
                if ( task.tag_name === "input") {
                    document.querySelector('[gjs-m="' + task.var + '"]').value = task.value;
                }
                document.querySelector('ginfo[m=' + task.var + ']').innerHTML = task.value;
            }
        }
    }
    
}

class Gjs {
    constructor(callback){
        this.models = [];
        this.edom = document.querySelector('gjs-controller').innerHTML;
        GTask = new GjsTaskManager(this.edom);
        this.init();
    }
    
    init(){
        this.collectModels();
    }
    
    collectModels(){
        let models = [].slice.call(document.querySelectorAll("[gjs-m]"));
        for (let i in models) {
            this.models.push(new GjsModel(models[i]));
        }
    }
    
    Models(variable) {
        for (let i in this.models) {
            if (this.models[i].var == variable) return this.models[i];
        }
        return null;
    }
}

class GjsModel {
    constructor(model) {
        this.id = Math.random();
        this.value = model.value;
        this.var = model.var ? model.var:model.getAttribute('gjs-m');
        this.tag_name = (model.tagName ? model.tagName.toLowerCase():null);
        this.binded = false;
        GTask.add(this);
    }
    
    set(value) {
        this.value = value;
        GTask.update(this);
    }
}

let G = new Gjs();
