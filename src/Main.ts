class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();
        const result = await RES.getResAsync("description_json")
        await platform.login();
        const userInfo = await platform.getUserInfo();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        var bg:egret.Shape = new egret.Shape();
        bg.graphics.beginFill( 0x336699 );
        bg.graphics.drawRect( 0, 0, this.stage.stageWidth, this.stage.stageHeight ); 
        bg.graphics.endFill();
        this.addChild(bg)
        var tx:egret.TextField = new egret.TextField();
        tx.text = "I'm Jack, I will use Egret create a fantasy mobile game!"; 
        tx.size = 32; 
        tx.x = 20; 
        tx.y = 20; 
        tx.width = this.stage.stageWidth - 40;
        tx.touchEnabled = true; 
        tx.addEventListener( egret.TouchEvent.TOUCH_TAP, this.touchHandler, this );
        this.addChild( tx );
        
    }
    private touchHandler( evt:egret.TouchEvent ):void{
        var tx:egret.TextField = evt.currentTarget;
        tx.textColor = 0x00ff00; 
    }
    
}
