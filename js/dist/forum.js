(()=>{var o={n:t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return o.d(e,{a:e}),e},d:(t,e)=>{for(var a in e)o.o(e,a)&&!o.o(t,a)&&Object.defineProperty(t,a,{enumerable:!0,get:e[a]})},o:(o,t)=>Object.prototype.hasOwnProperty.call(o,t),r:o=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(o,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(o,"__esModule",{value:!0})}},t={};(()=>{"use strict";o.r(t);const e=flarum.core.compat["common/extend"],a=flarum.core.compat["forum/app"];var r=o.n(a);const s=flarum.core.compat["common/components/TextEditor"];var n=o.n(s);const i=flarum.core.compat["common/components/TextEditorButton"];var c=o.n(i);const d=flarum.core.compat["forum/states/ComposerState.js"];var l=o.n(d);flarum.core.compat["components/DiscussionPage"],flarum.core.compat["forum/components/IndexPage"],r().initializers.add("tohsakarat-save-and-load-draft-automatically",(function(){(0,e.extend)(n().prototype,"controlItems",(function(o){r().composer.findEnd=function(){var o,t,e,a,s,n;if(null!=(o=r().composer)&&o.editor&&!(!(null==(t=r().composer)||null==(e=t.data())||!e.content.length)>5)&&null!=(a=r().composer.editor)&&a.moveCursorTo&&null!=(s=r().composer.editor)&&s.insertAtCursor&&null!=(n=r().composer.editor)&&n.getSelectionRange){var i=r().composer.editor.getSelectionRange()[1];for(console.log("try find cursor");;)try{if(i>65535)return;i++,r().composer.editor.moveCursorTo(i)}catch(o){console.log("find cursor now"),i--;break}}},window.composerAutosave=function(){if(r().composer.data){var o,t=r().session.user.data.attributes.username;if(r().composer.data&&r().composer.data().relationships.discussion)var e=t+"replyTo"+r().composer.data().relationships.discussion.data.id;else e="newDiscussion";"hidden"!=r().composer.position&&r().composer.data&&(null==(o=r().composer.data().content)?void 0:o.length)>20&&window.localStorage.setItem(e,r().composer.data().content),window.setTimeout((function(){window.composerAutosave()}),2e3)}},window.composerAutoLoad=function(){if(r().composer.data){var o,t=r().session.user.data.attributes.username;if(r().composer.data().relationships.discussion)var e=t+"replyTo"+r().composer.data().relationships.discussion.data.id;else e="newDiscussion";null!=(o=r().composer.editor)&&o.insertAtCursor&&(r().composer.editor.insertAtCursor(" "),r().composer.editor.insertAtCursor(window.localStorage.getItem(e),!1))}},o.add("tohsaka-save-and-load-draft-automatically",m(c(),{onclick:function(){var o,t=r().session.user.data.attributes.username;if(r().composer.data&&r().composer.data().relationships.discussion)var e=t+"replyTo"+r().composer.data().relationships.discussion.data.id;else e="newDiscussion";r().composer.data&&!r().composer.data().content.length&&null!=(o=window.localStorage.getItem(e))&&o.length?window.composerAutoLoad():未找到草稿},icon:"fa fa-pen-circle"},r().translator.trans("tohsakarat-save-and-load-draft-automatically.forum.buttons.load")))})),(0,e.extend)(l().prototype,"show",(function(){var o=r().session.user.data.attributes.username;if(r().composer.data&&r().composer.data().relationships.discussion)var t=o+"replyTo"+r().composer.data().relationships.discussion.data.id;else t="newDiscussion";setTimeout((function(){var o;r().composer.data&&!r().composer.data().content.length&&null!=(o=window.localStorage.getItem(t))&&o.length&&(console.log("有编辑记录"),1==confirm(r().translator.trans("tohsakarat-save-and-load-draft-automatically.forum.states.ask-for-load"))&&window.composerAutoLoad())}),500),setTimeout((function(){window.composerAutosave()}),1e3)})),(0,e.extend)(l().prototype,"minimize",function(){r().composer.editor&&r().composer.editor.insertAtCursor&&(r().composer.findEnd(),r().composer.editor.insertAtCursor("\n"))}.bind(r().composer)),(0,e.override)(l().prototype,"preventExit",function(){if(this.isVisible()&&this.onExit&&this.onExit.callback())return this.draftSaved||1!=confirm(r().translator.trans("tohsakarat-save-and-load-draft-automatically.forum.states.ask-for-save"))?1!=confirm(this.onExit.message)||(this.draftSaved=void 0,!1):(r().composer.saveDraft(),this.draftSaved=!0,!0)}.bind(r().composer))}))})(),module.exports=t})();
//# sourceMappingURL=forum.js.map