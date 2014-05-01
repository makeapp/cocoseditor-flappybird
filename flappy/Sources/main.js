/**
 * @GameName :
 * flappy bird
 *
 * @DevelopTool:
 * Cocos2d-x Editor (CocosEditor)
 *
 * @time
 * 2014-02-11 am
 *
 * @Licensed:
 * This showcase is licensed under GPL.
 *
 * @Authors:
 * Programmer: touchSnow
 *
 * @Links:
 * http://www.cocos2d-x.com/ (cocos官方)
 * https://github.com/makeapp      （github）
 * http://blog.csdn.net/touchsnow (csdn博客)
 * http://blog.makeapp.co/ （官方博客）
 * http://www.cocoseditor.com/ （建设中官网）
 *
 * @Contact
 * 邮箱：zuowen@makeapp.co
 * qq群：232361142
 *
 */

if (sys.platform == 'browser') {
    var require = function (file)
    {
        var d = document;
        var s = d.createElement('script');
        s.src = file;
        d.body.appendChild(s);
    }
}
else {
    require("jsb.js");
}

cc.debug = function (msg)
{
    cc.log(msg);
}

cc.BuilderReader.replaceScene = function (path, ccbName)
{
    var scene = cc.BuilderReader.loadAsSceneFrom(path, ccbName);
    cc.Director.getInstance().replaceScene(scene);
    return scene;
}

cc.BuilderReader.loadAsScene = function (file, owner, parentSize)
{
    var node = cc.BuilderReader.load(file, owner, parentSize);
    var scene = cc.Scene.create();
    scene.addChild(node);
    return scene;
};

cc.BuilderReader.loadAsSceneFrom = function (path, ccbName)
{
    if (path && path.length > 0) {
        cc.BuilderReader.setResourcePath(path + "/");
        return cc.BuilderReader.loadAsScene(path + "/" + ccbName);
    }
    else {
        return cc.BuilderReader.loadAsScene(ccbName);
    }
}

cc.BuilderReader.loadAsNodeFrom = function (path, ccbName, owner)
{
    if (path && path.length > 0) {
        cc.BuilderReader.setResourcePath(path + "/");
        return cc.BuilderReader.load(path + "/" + ccbName, owner);
    }
    else {
        return cc.BuilderReader.load(ccbName, owner);
    }
}

cc.BuilderReader.runScene = function (module, name)
{
    var director = cc.Director.getInstance();
    var scene = cc.BuilderReader.loadAsSceneFrom(module, name);
    var runningScene = director.getRunningScene();
    if (runningScene === null) {
        cc.log("runWithScene");
        director.runWithScene(scene);
    }
    else {
        cc.log("replaceScene");
        director.replaceScene(scene);
    }
}

cc.rectCreate = function (p, area)
{
    return  cc.rect(p.x - area[0], p.y - area[1], area[0] * 2, area[1] * 2);
}


function isInRect(ccRect, ccTouchBeganPos)
{
    if (ccTouchBeganPos.x > ccRect.x && ccTouchBeganPos.x < (ccRect.x + ccRect.width)) {
        if (ccTouchBeganPos.y > ccRect.y && ccTouchBeganPos.y < (ccRect.y + ccRect.height)) {
            return true;
        }
    }
    return false;
}

function getRandom(maxSize)
{
    return Math.floor(Math.random() * maxSize) % maxSize;
}

var ccb_resources = [
    {src: "Resources/flappy_packer.plist"},
    {src: "Resources/flappy_frame.plist"} ,
    {src: "Resources/flappy_packer.png"},
    {src: "Resources/bg.png"},
    {src: "Resources/ground.png"}
    /*  {src: "Resources/fonts/big_score.fnt"} ,
     {src: "Resources/fonts/small_score.fnt"},*/
    /* {src: "Resources/fonts/number.png"} ,
     {src: "Resources/fonts/number1.png"}*/
];

require("MainLayer.js");

if (sys.platform == 'browser') {

    var Cocos2dXApplication = cc.Application.extend({
        config: document['ccConfig'],
        ctor: function ()
        {
            this._super();
            cc.COCOS2D_DEBUG = this.config['COCOS2D_DEBUG'];
            cc.initDebugSetting();
            cc.setup(this.config['tag']);
            cc.AppController.shareAppController().didFinishLaunchingWithOptions();
        },
        applicationDidFinishLaunching: function ()
        {
            var director = cc.Director.getInstance();
            // director->enableRetinaDisplay(true);
            // director.setDisplayStats(this.config['showFPS']);
            // set FPS. the default value is 1.0/60 if you don't call this
            director.setAnimationInterval(1.0 / this.config['frameRate']);
            var glView = director.getOpenGLView();
            glView.setDesignResolutionSize(720, 1280, cc.RESOLUTION_POLICY.SHOW_ALL);
            cc.Loader.preload(ccb_resources, function ()
            {
                cc.BuilderReader.runScene("", "MainLayer");
            }, this);
            return true;
        }
    });
    var myApp = new Cocos2dXApplication();
}
else {
    cc.BuilderReader.runScene("", "MainLayer");
}