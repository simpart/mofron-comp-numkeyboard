/**
 * @file mofron-comp-numkeyboard/index.js
 * @brief mobile carousel component for mofron
 * @license MIT
 */
const Text       = require('mofron-comp-text');
const HrzCenter  = require('mofron-layout-hrzcenter');
const Grid       = require('mofron-layout-grid');
const Frame      = require('mofron-comp-frame');
const TouchStart = require('mofron-event-touchstart');
const Color      = require('mofron-effect-color');
const HrzPos     = require('mofron-effect-hrzpos');
const VrtPos     = require('mofron-effect-vrtpos');
const comutl  = mofron.util.common;
const ConfArg = mofron.class.ConfArg;

module.exports = class extends mofron.class.Component {
    /**
     * initialize component
     * 
     * @param (mixed) 
     *                key-value: component config
     * @type private
     */
    constructor (p1) {
        try {
            super();
            this.modname("NumKeyBoard");
            //this.shortForm('');
            
	    /* init config */
            this.confmng().add('accentColor', { type:'color', init:[180,180,180] });
	    this.confmng().add('keyEvent', { type:'event', list:true });
            //this.confmng().add('left', { type:'size', init:'0.1rem' });
            
	    if (0 < arguments.length) {
                this.config(p1);
            }
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    /**
     * initialize dom contents
     * 
     * @type private
     */
    initDomConts () {
        try {
            super.initDomConts();
            
            this.style({ 
                'position':'fixed',
                'bottom':  '0rem',
                'display': 'none'
            });
            this.size('100%','40%');
            this.layout(new HrzCenter(80));

	    let conts = new mofron.class.Component({
                            layout: new Grid([33,33,33])
                        });
            let key_txt = ['1','2','3','4','5','6','7','8','9','','0','&times;'];
            for (let idx=0; idx < 12 ;idx++) {
                conts.child(this.getKeyElement(key_txt[idx]));
            }
	    this.child(conts);
            
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    keyEvent (fnc,prm) {
        try {
            if (undefined === fnc) {
                return this.confmng('keyEvent');
	    }
	    this.confmng('keyEvent', [fnc,prm]);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }

    getKeyElement (prm) {
        try {
	    let tap_evt = (p1,p2,p3) => {
                try {
                    p1.baseColor(p3.accentColor());
		    setTimeout(() => {
                        p1.execEffect(2);
                    },20);
                    
		    //alert(p1.child()[0].text());
		    if ('' === p1.child()[0].text()) {
                        return;
		    }
                    let evt = p3.keyEvent();
		    let num = parseInt(p1.child()[0].text());
		    if (isNaN(num)) {
                        num = -1;
		    }
		    for (let eidx in evt) {
                        evt[eidx][0](p3, num, evt[eidx][1]);
		    }
		} catch (e) {
                    console.error(e.stack);
                    throw e;
                }
	    }
            
            let frame = new Frame({
                            size: new ConfArg('92%','92%'),
                            baseColor: 'white',
                            style: { 'margin-top': '4%', 'margin-left':'4%' },
                            borderWidth: '0rem',
                            shadow: '0.01rem',
                            event: new TouchStart(new ConfArg(tap_evt,this)),
			    effect: new Color({
			                eid:2, color: [255,255,255], speed:100,
					transition:"background", tag: 'NumKeyBoard'
	                            }),
                            child: new Text({
			               text:prm, size:'0.3rem',
				       effect:[new HrzPos(), new VrtPos()],
				   })
                        });
            let cmp   = new mofron.class.Component({
	                    height: ((window.innerHeight * 0.4) / 4) + 'px',
			    child: frame
		        });
            return cmp;
        } catch (e) {
            console.error(e.stack);
            throw e;
        }
    }
    
    accentColor (prm) {
        try {
            return this.confmng('accentColor', prm);
	} catch (e) {
            console.error(e.stack);
            throw e;
	}
    }
}
/* end of file */
