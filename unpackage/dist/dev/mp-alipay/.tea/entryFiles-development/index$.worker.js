if(!self.__appxInited) {
self.__appxInited = 1;


require('./config$');


  var AFAppX = self.AFAppX.getAppContext
    ? self.AFAppX.getAppContext().AFAppX
    : self.AFAppX;
  self.getCurrentPages = AFAppX.getCurrentPages;
  self.getApp = AFAppX.getApp;
  self.Page = AFAppX.Page;
  self.App = AFAppX.App;
  self.my = AFAppX.bridge || AFAppX.abridge;
  self.abridge = self.my;
  self.Component = AFAppX.WorkerComponent || function(){};
  self.$global = AFAppX.$global;
  self.requirePlugin = AFAppX.requirePlugin;
          

if(AFAppX.registerApp) {
  AFAppX.registerApp({
    appJSON: appXAppJson,
  });
}



function success() {
require('../../app');
require('../../components/base-page/base-page?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/punch-sign/punch-sign?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/punch-card/punch-card?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/class-list/class-list?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/talk-micha/talk-micha?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/talk-user/talk-user?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/micha-footer/micha-footer?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/card-header/card-header?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/card-upload/card-upload?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/card-score/card-score?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/card-textarea/card-textarea?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../components/card-sport/card-sport?hash=ec7c5687c7f2ffa836caf3a93e877914426baff6');
require('../../pages/index/index?hash=bdc400ff4727b8d163c74bf5b40313bb79ccdc58');
require('../../pages/report/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/user/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/micha/index?hash=fbbbc210029718a6a3959ea6ec544c73941df1c5');
require('../../pages/record/diet/index?hash=a3f677dbbed8a2c70e77490f25a6958843859118');
require('../../pages/record/index?hash=d2afab2619de217cce379211ac590eb2dcbd36c1');
require('../../pages/guide/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/record/sport/index?hash=661eb0d127caa27b95c6e0561a630794766dc20a');
require('../../pages/class/index?hash=d71165fb812fb443dee619517e9140c4164b45fe');
require('../../pages/bind/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
require('../../pages/auth/index?hash=32d7d2807ed4e666ef03b4b3fe8c38ecf2e34e68');
}
self.bootstrapApp ? self.bootstrapApp({ success }) : success();
}