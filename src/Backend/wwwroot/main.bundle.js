webpackJsonp([0,3],{

/***/ 1018:
/***/ function(module, exports) {

/* (ignored) */

/***/ },

/***/ 1019:
/***/ function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(534);


/***/ },

/***/ 181:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TodoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TodoService = (function () {
    function TodoService(http) {
        this.http = http;
    }
    TodoService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    TodoService.prototype.getTodos = function () {
        return this.http.get('/api/todo/getAll')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.getUsersTodos = function (id) {
        return this.http.get('/api/todo/users/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.getTodo = function (id) {
        return this.http.get('/api/todo/gettodo/' + id)
            .toPromise()
            .then(function (response) { return response.json()[0]; })
            .catch(this.handleError);
    };
    TodoService.prototype.addTodo = function (newTodo) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/todo', JSON.stringify(newTodo), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.deleteTodo = function (id) {
        return this.http.delete('/api/todo/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TodoService.prototype.updateTodo = function (todo) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/todo/' + todo.id, JSON.stringify(todo), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    TodoService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], TodoService);
    return TodoService;
    var _a;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/todo.service.js.map

/***/ },

/***/ 261:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return Auth; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// Avoid name not found warnings
var Auth0Lock = __webpack_require__(432).default;
var Auth = (function () {
    function Auth(router) {
        var _this = this;
        this.router = router;
        // Configure Auth0
        this.lock = new Auth0Lock('d0xGISxKVqS1jrxl59SQqH0upmOxImCO', 'dryoshi.eu.auth0.com', {});
        // Add callback for lock `authenticated` event
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        this.lock.on("authenticated", function (authResult) {
            localStorage.setItem('id_token', authResult.idToken);
            // Fetch profile information
            _this.lock.getProfile(authResult.idToken, function (error, profile) {
                if (error) {
                    // Handle error
                    alert(error);
                    return;
                }
                localStorage.setItem('profile', JSON.stringify(profile));
                _this.userProfile = profile;
                // Redirect if there is a saved url to do so.
                var redirectUrl = localStorage.getItem('redirect_url');
                if (redirectUrl != undefined) {
                    _this.router.navigate([redirectUrl]);
                    localStorage.removeItem('redirect_url');
                }
            });
        });
    }
    Auth.prototype.login = function () {
        // Call the show method to display the widget.
        this.lock.show();
    };
    Auth.prototype.authenticated = function () {
        // Check if there's an unexpired JWT
        // This searches for an item in localStorage with key == 'id_token'
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["tokenNotExpired"])();
    };
    Auth.prototype.isAdmin = function () {
        return this.userProfile && this.userProfile.app_metadata
            && this.userProfile.app_metadata.roles
            && this.userProfile.app_metadata.roles.indexOf('admin') > -1;
    };
    Auth.prototype.logout = function () {
        // Remove token from localStorage
        localStorage.removeItem('id_token');
        localStorage.removeItem('profile');
        this.userProfile = undefined;
        this.router.navigate(['']);
    };
    Auth = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_0__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], Auth);
    return Auth;
    var _a;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/auth.service.js.map

/***/ },

/***/ 262:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__ = __webpack_require__(517);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_toPromise__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(http) {
        this.http = http;
    }
    UserService.prototype.handleError = function (error) {
        console.error('An error occured', error);
        return Promise.reject(error.message || error);
    };
    UserService.prototype.getUsers = function () {
        return this.http.get('/api/user')
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.getUser = function (id) {
        return this.http.get('/api/user/' + id)
            .toPromise()
            .then(function (response) { return response.json()[0]; })
            .catch(this.handleError);
    };
    UserService.prototype.addUser = function (newUser) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.post('/api/user', JSON.stringify(newUser), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.deleteUser = function (id) {
        return this.http.delete('/api/user/' + id)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService.prototype.updateUser = function (user) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]();
        headers.append('Content-Type', 'application/json');
        return this.http.put('/api/user/' + user.id, JSON.stringify(user), { headers: headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === 'function' && _a) || Object])
    ], UserService);
    return UserService;
    var _a;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/user.service.js.map

/***/ },

/***/ 412:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return FrontpageComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FrontpageComponent = (function () {
    function FrontpageComponent() {
    }
    FrontpageComponent.prototype.ngOnInit = function () {
    };
    FrontpageComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-frontpage',
            template: __webpack_require__(899),
            styles: [__webpack_require__(889)]
        }), 
        __metadata('design:paramtypes', [])
    ], FrontpageComponent);
    return FrontpageComponent;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/frontpage.component.js.map

/***/ },

/***/ 413:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginComponent = (function () {
    function LoginComponent() {
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(900),
            styles: [__webpack_require__(890)]
        }), 
        __metadata('design:paramtypes', [])
    ], LoginComponent);
    return LoginComponent;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/login.component.js.map

/***/ },

/***/ 414:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NewTodoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NewTodoComponent = (function () {
    function NewTodoComponent() {
    }
    NewTodoComponent.prototype.ngOnInit = function () {
    };
    NewTodoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-new-todo',
            template: __webpack_require__(901),
            styles: [__webpack_require__(891)]
        }), 
        __metadata('design:paramtypes', [])
    ], NewTodoComponent);
    return NewTodoComponent;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/new-todo.component.js.map

/***/ },

/***/ 415:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return NewUserComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NewUserComponent = (function () {
    function NewUserComponent() {
    }
    NewUserComponent.prototype.ngOnInit = function () {
    };
    NewUserComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-new-user',
            template: __webpack_require__(902),
            styles: [__webpack_require__(892)]
        }), 
        __metadata('design:paramtypes', [])
    ], NewUserComponent);
    return NewUserComponent;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/new-user.component.js.map

/***/ },

/***/ 416:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_todo_todo_service__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(99);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TodoDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var TodoDetailComponent = (function () {
    function TodoDetailComponent(todoService, route, location) {
        this.todoService = todoService;
        this.route = route;
        this.location = location;
    }
    TodoDetailComponent.prototype.ngOnInit = function () {
        this.getDetails();
    };
    TodoDetailComponent.prototype.getDetails = function () {
        var _this = this;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.todoService
                .getTodo(id)
                .then(function (todo) { return _this.todo = todo; });
        });
    };
    TodoDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    TodoDetailComponent.prototype.save = function () {
        var _this = this;
        this.todoService.updateTodo(this.todo)
            .then(function () { return _this.goBack(); });
    };
    TodoDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-todo-detail',
            template: __webpack_require__(903),
            styles: [__webpack_require__(893)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_todo_todo_service__["a" /* TodoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__Services_todo_todo_service__["a" /* TodoService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === 'function' && _c) || Object])
    ], TodoDetailComponent);
    return TodoDetailComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/todo-detail.component.js.map

/***/ },

/***/ 417:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__ = __webpack_require__(181);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return TodosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TodosComponent = (function () {
    function TodosComponent(router, todoService) {
        this.router = router;
        this.todoService = todoService;
    }
    TodosComponent.prototype.ngOnInit = function () {
        this.getTodos();
    };
    TodosComponent.prototype.onSelect = function (todo) {
        this.selectedTodo = todo;
    };
    TodosComponent.prototype.getTodos = function () {
        var _this = this;
        this.todoService
            .getTodos()
            .then(function (todos) { return _this.todos = todos; });
    };
    TodosComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/todo/', this.selectedTodo.id]);
    };
    TodosComponent.prototype.deleteTodo = function (todo) {
        var _this = this;
        this.todoService
            .deleteTodo(todo.id)
            .then(function () {
            _this.todos = _this.todos.filter(function (h) { return h !== todo; });
            if (_this.selectedTodo === todo) {
                _this.selectedTodo = null;
            }
        });
    };
    TodosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-todos',
            template: __webpack_require__(904),
            styles: [__webpack_require__(894)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__["a" /* TodoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__["a" /* TodoService */]) === 'function' && _b) || Object])
    ], TodosComponent);
    return TodosComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/todos.component.js.map

/***/ },

/***/ 418:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_user_user_service__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__ = __webpack_require__(999);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_switchMap__);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserDetailComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var UserDetailComponent = (function () {
    function UserDetailComponent(userService, route, location) {
        this.userService = userService;
        this.route = route;
        this.location = location;
    }
    UserDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params
            .switchMap(function (params) { return _this.userService.getUser(params['id']); })
            .subscribe(function (user) { return _this.user = user; });
    };
    UserDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    UserDetailComponent.prototype.save = function () {
        var _this = this;
        this.userService.updateUser(this.user)
            .then(function () { return _this.goBack(); });
    };
    UserDetailComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-detail',
            template: __webpack_require__(905),
            styles: [__webpack_require__(895)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_user_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__Services_user_user_service__["a" /* UserService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__angular_common__["f" /* Location */]) === 'function' && _c) || Object])
    ], UserDetailComponent);
    return UserDetailComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/user-detail.component.js.map

/***/ },

/***/ 419:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__ = __webpack_require__(181);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UserTodosComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserTodosComponent = (function () {
    function UserTodosComponent(router, route, todoService) {
        var _this = this;
        this.router = router;
        this.route = route;
        this.todoService = todoService;
        this.route.params.forEach(function (params) {
            var id = params['id'];
            _this.todoService.getUsersTodos(id).then(function (todos) { _this.todos = todos; });
        });
    }
    UserTodosComponent.prototype.ngOnInit = function () { };
    UserTodosComponent.prototype.onSelect = function (todo) {
        this.selectedTodo = todo;
    };
    UserTodosComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/todo/', this.selectedTodo.id]);
    };
    UserTodosComponent.prototype.deleteCharacterClass = function (todo) {
        var _this = this;
        this.todoService
            .deleteTodo(todo.id)
            .then(function () {
            _this.todos = _this.todos.filter(function (h) { return h !== todo; });
            if (_this.selectedTodo === todo) {
                _this.selectedTodo = null;
            }
        });
    };
    UserTodosComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-user-todos',
            template: __webpack_require__(906),
            styles: [__webpack_require__(896)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* ActivatedRoute */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__["a" /* TodoService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__Services_todo_todo_service__["a" /* TodoService */]) === 'function' && _c) || Object])
    ], UserTodosComponent);
    return UserTodosComponent;
    var _a, _b, _c;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/user-todos.component.js.map

/***/ },

/***/ 420:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_user_user_service__ = __webpack_require__(262);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return UsersComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UsersComponent = (function () {
    function UsersComponent(router, userService) {
        this.router = router;
        this.userService = userService;
    }
    UsersComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    UsersComponent.prototype.onSelect = function (user) {
        this.selectedUser = user;
    };
    UsersComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService
            .getUsers()
            .then(function (users) { return _this.users = users; });
    };
    UsersComponent.prototype.gotoTodos = function () {
        this.router.navigate(['/user/', this.selectedUser.id]);
    };
    UsersComponent.prototype.gotoUserDetails = function () {
        this.router.navigate(['/user/detail/', this.selectedUser.id]);
    };
    UsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService
            .deleteUser(user.id)
            .then(function () {
            _this.users = _this.users.filter(function (h) { return h !== user; });
            if (_this.selectedUser === user) {
                _this.selectedUser = null;
            }
        });
    };
    UsersComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-users',
            template: __webpack_require__(907),
            styles: [__webpack_require__(897)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__Services_user_user_service__["a" /* UserService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__Services_user_user_service__["a" /* UserService */]) === 'function' && _b) || Object])
    ], UsersComponent);
    return UsersComponent;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/users.component.js.map

/***/ },

/***/ 421:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Services_auth_auth_service__ = __webpack_require__(261);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AppComponent = (function () {
    function AppComponent(auth) {
        this.auth = auth;
        this.title = 'Todo!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(908),
            styles: [__webpack_require__(898)],
            providers: [__WEBPACK_IMPORTED_MODULE_1__Services_auth_auth_service__["a" /* Auth */]]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__Services_auth_auth_service__["a" /* Auth */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__Services_auth_auth_service__["a" /* Auth */]) === 'function' && _a) || Object])
    ], AppComponent);
    return AppComponent;
    var _a;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/app.component.js.map

/***/ },

/***/ 533:
/***/ function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 533;


/***/ },

/***/ 534:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(646);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__polyfills_ts__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(645);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app___ = __webpack_require__(644);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app___["a" /* AppModule */]);
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/main.js.map

/***/ },

/***/ 640:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return LoginService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoginService = (function () {
    function LoginService() {
    }
    LoginService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [])
    ], LoginService);
    return LoginService;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/login.service.js.map

/***/ },

/***/ 641:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_routing__ = __webpack_require__(642);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_users_users_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Components_todos_todos_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Components_login_login_component__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Components_frontpage_frontpage_component__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__Services_user_user_service__ = __webpack_require__(262);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Services_todo_todo_service__ = __webpack_require__(181);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__Services_login_login_service__ = __webpack_require__(640);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__Components_user_todos_user_todos_component__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__Components_todo_detail_todo_detail_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__Components_new_user_new_user_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__Components_new_todo_new_todo_component__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Components_user_detail_user_detail_component__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_jwt__ = __webpack_require__(422);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_18_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__Services_auth_auth_service__ = __webpack_require__(261);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__Components_users_users_component__["a" /* UsersComponent */],
                __WEBPACK_IMPORTED_MODULE_7__Components_todos_todos_component__["a" /* TodosComponent */],
                __WEBPACK_IMPORTED_MODULE_8__Components_login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_9__Components_frontpage_frontpage_component__["a" /* FrontpageComponent */],
                __WEBPACK_IMPORTED_MODULE_13__Components_user_todos_user_todos_component__["a" /* UserTodosComponent */],
                __WEBPACK_IMPORTED_MODULE_14__Components_todo_detail_todo_detail_component__["a" /* TodoDetailComponent */],
                __WEBPACK_IMPORTED_MODULE_15__Components_new_user_new_user_component__["a" /* NewUserComponent */],
                __WEBPACK_IMPORTED_MODULE_16__Components_new_todo_new_todo_component__["a" /* NewTodoComponent */],
                __WEBPACK_IMPORTED_MODULE_17__Components_user_detail_user_detail_component__["a" /* UserDetailComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["b" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
                __WEBPACK_IMPORTED_MODULE_5__app_routing__["a" /* routing */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_10__Services_user_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_11__Services_todo_todo_service__["a" /* TodoService */],
                __WEBPACK_IMPORTED_MODULE_12__Services_login_login_service__["a" /* LoginService */],
                __WEBPACK_IMPORTED_MODULE_18_angular2_jwt__["AUTH_PROVIDERS"],
                __WEBPACK_IMPORTED_MODULE_5__app_routing__["b" /* appRoutingProviders */],
                __WEBPACK_IMPORTED_MODULE_19__Services_auth_auth_service__["a" /* Auth */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/app.module.js.map

/***/ },

/***/ 642:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Components_users_users_component__ = __webpack_require__(420);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Components_todos_todos_component__ = __webpack_require__(417);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__Components_login_login_component__ = __webpack_require__(413);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__Components_frontpage_frontpage_component__ = __webpack_require__(412);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__Components_user_todos_user_todos_component__ = __webpack_require__(419);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__Components_todo_detail_todo_detail_component__ = __webpack_require__(416);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__Components_user_detail_user_detail_component__ = __webpack_require__(418);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__Components_new_user_new_user_component__ = __webpack_require__(415);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__Components_new_todo_new_todo_component__ = __webpack_require__(414);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__auth_guard__ = __webpack_require__(643);
/* harmony export (binding) */ __webpack_require__.d(exports, "b", function() { return appRoutingProviders; });
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return routing; });











var appRoutes = [
    {
        path: 'frontpage',
        component: __WEBPACK_IMPORTED_MODULE_4__Components_frontpage_frontpage_component__["a" /* FrontpageComponent */]
    },
    {
        path: '',
        redirectTo: '/frontpage',
        pathMatch: 'full'
    },
    {
        path: 'users',
        component: __WEBPACK_IMPORTED_MODULE_1__Components_users_users_component__["a" /* UsersComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_10__auth_guard__["a" /* AuthGuard */]]
    },
    {
        path: 'user/:id',
        component: __WEBPACK_IMPORTED_MODULE_5__Components_user_todos_user_todos_component__["a" /* UserTodosComponent */]
    },
    {
        path: 'user/detail/:id',
        component: __WEBPACK_IMPORTED_MODULE_7__Components_user_detail_user_detail_component__["a" /* UserDetailComponent */]
    },
    {
        path: 'todos',
        component: __WEBPACK_IMPORTED_MODULE_2__Components_todos_todos_component__["a" /* TodosComponent */]
    },
    {
        path: 'todo/:id',
        component: __WEBPACK_IMPORTED_MODULE_6__Components_todo_detail_todo_detail_component__["a" /* TodoDetailComponent */]
    },
    {
        path: 'login',
        component: __WEBPACK_IMPORTED_MODULE_3__Components_login_login_component__["a" /* LoginComponent */]
    },
    {
        path: 'newuser',
        component: __WEBPACK_IMPORTED_MODULE_8__Components_new_user_new_user_component__["a" /* NewUserComponent */]
    },
    {
        path: 'newtodo',
        component: __WEBPACK_IMPORTED_MODULE_9__Components_new_todo_new_todo_component__["a" /* NewTodoComponent */]
    }
];
var appRoutingProviders = [
    __WEBPACK_IMPORTED_MODULE_10__auth_guard__["a" /* AuthGuard */]
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/app.routing.js.map

/***/ },

/***/ 643:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(77);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Services_auth_auth_service__ = __webpack_require__(261);
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return AuthGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuard = (function () {
    function AuthGuard(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function (next, state) {
        if (this.auth.authenticated()) {
            if (this.auth.isAdmin()) {
                return true;
            }
            else {
                this.router.navigate(['todos']);
                return false;
            }
        }
        else {
            localStorage.setItem('redirect_url', state.url);
            this.auth.login();
            this.router.navigate(['']);
            return false;
        }
    };
    AuthGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__Services_auth_auth_service__["a" /* Auth */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__Services_auth_auth_service__["a" /* Auth */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], AuthGuard);
    return AuthGuard;
    var _a, _b;
}());
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/auth.guard.js.map

/***/ },

/***/ 644:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_component__ = __webpack_require__(421);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(641);
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(exports, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__app_module__["a"]; });


//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/index.js.map

/***/ },

/***/ 645:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(exports, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/environment.js.map

/***/ },

/***/ 646:
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(721);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(714);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(710);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(713);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(712);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(720);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(709);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(708);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(718);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(711);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(719);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(717);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(722);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1017);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=C:/Users/espen/Documents/Visual Studio 2015/Projects/TodoWebsite/src/Frontend/src/polyfills.js.map

/***/ },

/***/ 889:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 890:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 891:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 892:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 893:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 894:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 895:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 896:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 897:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 898:
/***/ function(module, exports) {

module.exports = ""

/***/ },

/***/ 899:
/***/ function(module, exports) {

module.exports = "<p>\n  frontpage works!\n</p>\n"

/***/ },

/***/ 900:
/***/ function(module, exports) {

module.exports = "<p>\n  login works!\n</p>\n"

/***/ },

/***/ 901:
/***/ function(module, exports) {

module.exports = "<div>\n  <div class=\"w3-container w3-green\">\n    <h2>New Todo</h2>\n  </div>\n  <form class=\"w3-container\">\n    <p>\n      <label>Title</label>\n      <input class=\"w3-input\" type=\"text\">\n    </p>\n    <p>\n      <label>Type</label>\n      <select class=\"w3-select\" name=\"option\">\n        <option value=\"\" disabled selected>Choose todo type</option>\n        <option value=\"1\">ASAP</option>\n        <option value=\"2\">Important</option>\n        <option value=\"3\">Optional</option>\n      </select>\n    </p>\n    <p>\n      <label>Description</label>\n      <input class=\"w3-input\" type=\"text\">\n    </p>\n    <p>\n      <button class=\"w3-btn w3-green\">Register</button>\n    </p>\n  </form>\n</div>"

/***/ },

/***/ 902:
/***/ function(module, exports) {

module.exports = "<div>\n  <div class=\"w3-container w3-green\">\n    <h2>New User</h2>\n  </div>\n  <form class=\"w3-container\">\n    <p>\n      <label>First Name</label>\n      <input class=\"w3-input\" type=\"text\"></p>\n    <p>\n      <label>Last Name</label>\n      <input class=\"w3-input\" type=\"text\"></p>\n    <p>\n      <label>Email</label>\n      <input class=\"w3-input\" type=\"text\"></p>\n    <p>\n      <button class=\"w3-btn w3-green\">Register</button></p>\n  </form>\n</div>"

/***/ },

/***/ 903:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"todo\">\n  <h2>{{todo.title}} details!</h2>\n  <div>\n    <div>\n      <label #a>Title: </label>\n      <label #b>{{todo.title}}</label>\n    </div>\n    <div>\n      <label #a>Description: </label>\n      <label #b>{{todo.description}}</label>\n    </div>\n    <div>\n      <label #a>Type: </label>\n      <label #b>{{todo.type}}</label>\n    </div>\n    <div>\n      <label #a>userID: </label>\n      <label #b>{{todo.userID}}</label>\n    </div>\n  </div>\n\n  <button (click)=\"goBack()\">Back</button>\n  <button (click)=\"save()\">Save</button>\n</div>"

/***/ },

/***/ 904:
/***/ function(module, exports) {

module.exports = "<div class=\"w3-container w3-green\">\n    <h2>Todos</h2>\n  </div>\n<div class=\"w3-container\">\n  <table class=\"w3-table-all w3-card-4 w3-hoverable\">\n    <thead>\n    <tr>\n      <th>Title</th>\n      <th>Type</th>\n    </tr>\n    </thead>\n    <tr *ngFor=\"let todo of todos\" [class.selected]=\"todo === selectedTodo\" (click)=\"onSelect(todo)\">\n      <td>{{todo.title}}</td>\n      <td>{{todo.type}}</td>\n    </tr>\n  </table>\n</div>\n<div>\n<br>\n<button class=\"w3-btn w3-white w3-border w3-border-blue w3-round-xlarge\"><a routerLink=\"/newtodo\">Create a new Todo</a></button>\n</div>\n<div *ngIf=\"selectedTodo\">\n  <h2>\n    {{selectedTodo.title | uppercase}} is selected\n  </h2>\n  <button (click)=\"gotoDetail()\">View Todo</button>\n</div>"

/***/ },

/***/ 905:
/***/ function(module, exports) {

module.exports = "<div *ngIf=\"user\">\n  <h2>{{user.name}} details!</h2>\n  <div>\n    <div>\n      <label>email: </label>\n      <label>{{user.email}}</label>\n    </div>\n    <div>\n      <label>Todos: </label>\n      <label>{{user.numberOfTodos}}</label>\n    </div>\n  </div>\n\n  <button (click)=\"goBack()\">Back</button>\n  <button (click)=\"save()\">Save</button>\n</div>"

/***/ },

/***/ 906:
/***/ function(module, exports) {

module.exports = "<h1>User todos</h1>\n<div class=\"w3-container\">\n  <table class=\"w3-table-all w3-card-4 w3-hoverable\">\n    <thead>\n    <tr>\n      <th>Title</th>\n      <th>Type</th>\n    </tr>\n    </thead>\n    <tr *ngFor=\"let todo of todos\" [class.selected]=\"todo === selectedTodo\" (click)=\"onSelect(todo)\">\n      <td>{{todo.title}}</td>\n      <td>{{todo.type}}</td>\n      <td><span (click)=\"deleteTodo(todo); $event.stopPropagation()\" class=\"w3-closebtn w3-margin-right w3-medium\">&times;</span></td>\n    </tr>\n  </table>\n</div>\n<br>\n<button class=\"w3-btn w3-white w3-border w3-border-blue w3-round-xlarge\"><a class=\"\" routerLink=\"/newTodo\">Create a new Todo</a></button>\n<div *ngIf=\"selectedTodo\">\n  <h2>\n    {{selectedTodo.title | uppercase}} is selected\n  </h2>\n  <button (click)=\"gotoDetail()\">View Todo</button>\n</div>\n\n"

/***/ },

/***/ 907:
/***/ function(module, exports) {

module.exports = "<div class=\"w3-container w3-green\">\n  <h2>Users</h2>\n</div>\n<div class=\"w3-container\">\n  <ul class=\"users w3-ul w3-hoverable w3-card-4 w3-quarter \">\n    <li *ngFor=\"let user of users\" [class.selected]=\"user === selectedUser\" (click)=\"onSelect(user)\">\n      <span>{{user.name}}</span>\n      <span (click)=\"deleteUser(user); $event.stopPropagation()\" class=\"w3-closebtn w3-margin-right w3-medium\">&times;</span>\n    </li>\n  </ul>\n</div>\n<br>\n<button class=\"w3-btn w3-white w3-border w3-border-blue w3-round-xlarge\"><a routerLink=\"/newuser\">Create a new User</a></button>\n<div *ngIf=\"selectedUser\">\n  <h2>\n    {{selectedUser.name | uppercase}} is selected\n  </h2>\n  <button (click)=\"gotoTodos()\">View Todos</button><button (click)=\"gotoUserDetails()\">View user details</button>\n</div>"

/***/ },

/***/ 908:
/***/ function(module, exports) {

module.exports = "<h1>{{title}}</h1>\n<nav>\n    <ul class=\"w3-navbar w3-light-grey w3-border w3-padding\">\n        <li><a routerLink=\"/frontpage\" class=\"w3-green\" routerLinkActive=\"active\">Frontpage</a></li>\n        <li><a routerLink=\"/users\" class=\"w3-green\" routerLinkActive=\"active\">Users</a></li>\n        <li><a routerLink=\"/todos\" class=\"w3-green\" routerLinkActive=\"active\">Todos</a></li>\n        <li *ngIf=\"!auth.authenticated()\" class=\"w3-right\"><button class=\"btn btn-primary btn-margin\" (click)=\"auth.login()\">Log In</button></li>\n        <li *ngIf=\"auth.authenticated()\" class=\"w3-right\"><button class=\"btn btn-primary\" (click)=\"auth.logout()\">Log Out</button></li>\n    </ul>\n</nav>\n<div>\n    <router-outlet></router-outlet>\n</div>\n<footer class=\"w3-container w3-light-grey w3-border w3-padding\">\n    <div>\n        <p class=\"w3-left\">Made by Espen Sønnervig</p>\n        <p class=\"w3-right\">Powered by ASP.NET Core, Angular 2 and W3.CSS</p>\n    </div>\n</footer>"

/***/ }

},[1019]);
//# sourceMappingURL=main.bundle.map