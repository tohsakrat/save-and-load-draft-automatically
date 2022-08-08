import { extend, override } from 'flarum/common/extend';
import app from 'flarum/forum/app';

import TextEditor from "flarum/common/components/TextEditor";
import TextEditorButton from "flarum/common/components/TextEditorButton";

//import Composer from "flarum/forum/components/Composer.js";
import ComposerState from "flarum/forum/states/ComposerState.js";

import DiscussionPage from 'flarum/components/DiscussionPage';

import IndexPage from 'flarum/forum/components/IndexPage';


app.initializers.add('tohsakarat-save-and-load-draft-automatically', () => {
//console.log('app.initializers.add')
//console.log(extend)
//console.log(override)
      app.composer.findEnd=()=>{
			if(!app.composer?.editor || !!app.composer?.data()?.content.length>5 ||  !app.composer.editor?.moveCursorTo ||  !app.composer.editor?.insertAtCursor  || !app.composer.editor?.getSelectionRange)return;
	          let i = app.composer.editor.getSelectionRange()[1]
			  
                        console.log('try find cursor')
              while(1){ 
                try{
                   //console.log(i)
                   if(i>65535)return;
						i++
                        app.composer.editor.moveCursorTo( i ) 
                        //for(let j =0;j<65536;j++){}
                        
                }catch(err)
                { 
                  console.log('find cursor now')
					i--;
					
                  //console.log(err);
				  break
                }
               }
      }  

      window.composerAutosave=()=>{
        if(app.composer.data ){
        let username = app.session.user.data.attributes.username;
        if(app.composer.data && app.composer.data().relationships.discussion){
        let discussionID = app.composer.data().relationships.discussion.data.id;
        var storageName = username + 'replyTo' +discussionID
        }else{
        var storageName = 'newDiscussion'
        }
      
        //console.log('123autosave ')
        //console.log(storageName)
        if(app.composer.position!='hidden'){
        
        if(app.composer.data && app.composer.data().content?.length>20){
          window.localStorage.setItem(storageName ,app.composer.data().content);
         // console.log('autosave '+storageName)
        }
        }   

        window.setTimeout( ()=>{
          window.composerAutosave()
        },2000);
        
        }
      }  
  
        window.composerAutoLoad=()=>{
        if(app.composer.data ){
        let username = app.session.user.data.attributes.username;
        if( app.composer.data().relationships.discussion){
        let discussionID = app.composer.data().relationships.discussion.data.id;
        var storageName = username + 'replyTo' +discussionID
        }else{
        var storageName = 'newDiscussion'
        }
        if(app.composer.editor?.insertAtCursor){app.composer.editor.insertAtCursor(' ')
        app.composer.editor.insertAtCursor(window.localStorage.getItem(storageName),false)}
        }
      }




    extend(TextEditor.prototype, 'controlItems', function (items) {
	
    //console.log('我在这里controlItems')
    
      items.add(
        "tohsaka-save-and-load-draft-automatically",
        <TextEditorButton
          onclick={() => {
            let username = app.session.user.data.attributes.username;
            if(app.composer.data && app.composer.data().relationships.discussion){
            let discussionID = app.composer.data().relationships.discussion.data.id;
            var storageName = username + 'replyTo' +discussionID
            }else{
            var storageName = 'newDiscussion'
            }
            if(app.composer.data && !app.composer.data().content.length && !!window.localStorage.getItem(storageName)?.length){
                window.composerAutoLoad()
              
            }else{
              未找到草稿
            }
          }}
          icon="fa fa-pen-circle"
        >

          {app.translator.trans( `tohsakarat-save-and-load-draft-automatically.forum.buttons.load`)}
        </TextEditorButton>
      );
 
    });
    console.dir(TextEditor)
    //window.Composer=Composer



        extend(ComposerState.prototype, 'show', function () {
        
        //console.log('我在这里ComposerState.prototypeshow')
          let username = app.session.user.data.attributes.username;
          if(app.composer.data && app.composer.data().relationships.discussion){
          let discussionID = app.composer.data().relationships.discussion.data.id;
          var storageName = username + 'replyTo' +discussionID
          }else{
          var storageName = 'newDiscussion'
          }
      
          //console.log(' loadComposer')
        
          setTimeout( ()=>{
              //console.log('timeOut')
              if(app.composer.data && !app.composer.data().content.length && !!window.localStorage.getItem(storageName)?.length){
                console.log('有编辑记录')
                let mymessage=confirm( app.translator.trans( `tohsakarat-save-and-load-draft-automatically.forum.states.ask-for-load`));
                if(mymessage==true) {  window.composerAutoLoad()}
                
              }
            },500);
    

          setTimeout(()=>{
            window.composerAutosave()
          },1000);
        
  
        });
    
       extend(ComposerState.prototype, 'minimize', function () {
              
              /*if (!this.isVisible()) return;
                
              let trimHtml = (str)=>{
              str=str.replaceAll('<br>','\n')
              str=str.replaceAll('<p>','\n')
              str=str.replaceAll('</p>','\n')
              str = str.replace(/<[^>]*>/g,"");
              return str;
              }*/
			  
            // console.log('我在这里ComposerState.prototype, minimizeshow')
            if(app.composer.editor && app.composer.editor.insertAtCursor){
			    app.composer.findEnd();
              app.composer.editor.insertAtCursor('\n');
            }

              //console.log('minimize')

      }.bind(app.composer));
      

    

	  
	    override(ComposerState.prototype, 'preventExit', function () {
	     // console.log('我在这里ComposerState.prototype preventExitshow')
			if (!this.isVisible()) return;
			if (!this.onExit) return;

			if (this.onExit.callback()) {
			if(app.composer.saveDraft){
			if(!this.draftSaved){
			   
			let mymessage=confirm( app.translator.trans( `tohsakarat-save-and-load-draft-automatically.forum.states.ask-for-save`));
            if(mymessage==true) {  app.composer.saveDraft();this.draftSaved = true; return true}
			}
			
			let mymessage1=confirm(this.onExit.message);
			
			if(mymessage1==true){
			    //console.log('Nprevent')
			    this.draftSaved = undefined;
			    return false;
			    
			}else{
			   // console.log('prevent1')
			    return true;
			}
			
			}else{
			let mymessage1=confirm(this.onExit.message);
			
    			if(mymessage1==true){
    			    //console.log('Nprevent')
    			   // this.draftSaved = undefined;
    			    return false;
    			    
    			}else{
    			   // console.log('prevent1')
    			    return true;
    			}
    			    
			    
			}
			
			
			
			
			
			    //console.log('prevent2')
			return true;
			    
			}
		}.bind(app.composer));
	  
 

      
      
      
    
  });
