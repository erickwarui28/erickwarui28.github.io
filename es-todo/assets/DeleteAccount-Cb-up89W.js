import{r as v,j as h,i as de}from"./index-ocbheB3x.js";import{ax as F,d as A,a as R,ay as fe,az as pe,aA as _e,aB as ge,aC as me,v as N,c as M,y as V,aD as P,aE as we,aF as be,aG as Re,aH as Ee,aI as Te,au as ke,q as ye,z as xe,aJ as ve,_ as Ae,aK as K,an as Oe,aL as De,aM as Ie,aN as W,R as Ce}from"./App-t7zNs-k9.js";import{e as S,_ as Ne,c as Pe,g as Ue,b as Q,p as Se,h as Le,q as je,F as Fe,t as Me,C as $e,v as G,S as He}from"./useVpsAuth-DAqifju-.js";import"./sentry-J8BNSdxk.js";import"./index-BNSkQP0z.js";import"./browser-DE3-QIm0.js";import"./client-YHi_2N10.js";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ee="firebasestorage.googleapis.com",te="storageBucket",qe=120*1e3,Be=600*1e3;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _ extends Fe{constructor(t,n,s=0){super($(t),`Firebase Storage: ${n} (${$(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,_.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return $(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var p;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(p||(p={}));function $(e){return"storage/"+e}function ne(){const e="An unknown error occurred, please check the error payload for server response.";return new _(p.UNKNOWN,e)}function Ve(e){return new _(p.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function Ke(e){return new _(p.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function We(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new _(p.UNAUTHENTICATED,e)}function Ge(){return new _(p.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function Xe(e){return new _(p.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function ze(){return new _(p.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function Ye(){return new _(p.CANCELED,"User canceled the upload/download.")}function Ze(e){return new _(p.INVALID_URL,"Invalid URL '"+e+"'.")}function Je(e){return new _(p.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function Qe(){return new _(p.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+te+"' property when initializing the app?")}function H(e){return new _(p.INVALID_ARGUMENT,e)}function se(){return new _(p.APP_DELETED,"The Firebase app was deleted.")}function et(e){return new _(p.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function I(e){throw new _(p.INTERNAL_ERROR,"Internal error: "+e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=w.makeFromUrl(t,n)}catch{return new w(t,"")}if(s.path==="")return s;throw Je(t)}static makeFromUrl(t,n){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(E){E.path.charAt(E.path.length-1)==="/"&&(E.path_=E.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+i+a,"i"),u={bucket:1,path:3};function o(E){E.path_=decodeURIComponent(E.path)}const l="v[A-Za-z0-9_]+",f=n.replace(/[.]/g,"\\."),g="(/([^?#]*).*)?$",k=new RegExp(`^https?://${f}/${l}/b/${i}/o${g}`,"i"),T={bucket:1,path:3},d=n===ee?"(?:storage.googleapis.com|storage.cloud.google.com)":n,m="([^?#]*)",x=new RegExp(`^https?://${d}/${i}/${m}`,"i"),y=[{regex:c,indices:u,postModify:r},{regex:k,indices:T,postModify:o},{regex:x,indices:{bucket:1,path:2},postModify:o}];for(let E=0;E<y.length;E++){const C=y[E],L=C.regex.exec(t);if(L){const he=L[C.indices.bucket];let j=L[C.indices.path];j||(j=""),s=new w(he,j),C.postModify(s);break}}if(s==null)throw Ze(t);return s}}class tt{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nt(e,t,n){let s=1,i=null,r=null,a=!1,c=0;function u(){return c===2}let o=!1;function l(...m){o||(o=!0,t.apply(null,m))}function f(m){i=setTimeout(()=>{i=null,e(k,u())},m)}function g(){r&&clearTimeout(r)}function k(m,...x){if(o){g();return}if(m){g(),l.call(null,m,...x);return}if(u()||a){g(),l.call(null,m,...x);return}s<64&&(s*=2);let y;c===1?(c=2,y=0):y=(s+Math.random())*1e3,f(y)}let T=!1;function d(m){T||(T=!0,g(),!o&&(i!==null?(m||(c=2),clearTimeout(i),f(0)):m||(c=1)))}return f(0),r=setTimeout(()=>{a=!0,d(!0)},n),d}function st(e){e(!1)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function it(e){return e!==void 0}function rt(e){return typeof e=="object"&&!Array.isArray(e)}function q(e,t,n,s){if(s<t)throw H(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw H(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ie(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function ot(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const i=t(s)+"="+t(e[s]);n=n+i+"&"}return n=n.slice(0,-1),n}var O;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(O||(O={}));/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function at(e,t){const n=e>=500&&e<600,i=[408,429].indexOf(e)!==-1,r=t.indexOf(e)!==-1;return n||i||r}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(t,n,s,i,r,a,c,u,o,l,f,g=!0,k=!1){this.url_=t,this.method_=n,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=o,this.progressCallback_=l,this.connectionFactory_=f,this.retry=g,this.isUsingEmulator=k,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((T,d)=>{this.resolve_=T,this.reject_=d,this.start_()})}start_(){const t=(s,i)=>{if(i){s(!1,new U(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const a=c=>{const u=c.loaded,o=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,o)};this.progressCallback_!==null&&r.addUploadProgressListener(a),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(a),this.pendingConnection_=null;const c=r.getErrorCode()===O.NO_ERROR,u=r.getStatus();if(!c||at(u,this.additionalRetryCodes_)&&this.retry){const l=r.getErrorCode()===O.ABORT;s(!1,new U(!1,null,l));return}const o=this.successCodes_.indexOf(u)!==-1;s(!0,new U(o,r))})},n=(s,i)=>{const r=this.resolve_,a=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());it(u)?r(u):r()}catch(u){a(u)}else if(c!==null){const u=ne();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(i.canceled){const u=this.appDelete_?se():Ye();a(u)}else{const u=ze();a(u)}};this.canceled_?n(!1,new U(!1,null,!0)):this.backoffId_=nt(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&st(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class U{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function ut(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function lt(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function ht(e,t){t&&(e["X-Firebase-GMPID"]=t)}function dt(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function ft(e,t,n,s,i,r,a=!0,c=!1){const u=ot(e.urlParams),o=e.url+u,l=Object.assign({},e.headers);return ht(l,t),ut(l,n),lt(l,r),dt(l,s),new ct(o,e.method,l,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a,c)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(e){let t;try{t=JSON.parse(e)}catch{return null}return rt(t)?t:null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _t(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function gt(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function mt(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const X="prefixes",z="items";function wt(e,t,n){const s={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[X])for(const i of n[X]){const r=i.replace(/\/$/,""),a=e._makeStorageReference(new w(t,r));s.prefixes.push(a)}if(n[z])for(const i of n[z]){const r=e._makeStorageReference(new w(t,i.name));s.items.push(r)}return s}function bt(e,t,n){const s=pt(n);return s===null?null:wt(e,t,s)}class re{constructor(t,n,s,i){this.url=t,this.method=n,this.handler=s,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(e){if(!e)throw ne()}function Et(e,t){function n(s,i){const r=bt(e,t,i);return Rt(r!==null),r}return n}function oe(e){function t(n,s){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=Ge():i=We():n.getStatus()===402?i=Ke(e.bucket):n.getStatus()===403?i=Xe(e.path):i=s,i.status=n.getStatus(),i.serverResponse=s.serverResponse,i}return t}function Tt(e){const t=oe(e);function n(s,i){let r=t(s,i);return s.getStatus()===404&&(r=Ve(e.path)),r.serverResponse=i.serverResponse,r}return n}function kt(e,t,n,s,i){const r={};t.isRoot?r.prefix="":r.prefix=t.path+"/",n.length>0&&(r.delimiter=n),s&&(r.pageToken=s),i&&(r.maxResults=i);const a=t.bucketOnlyServerUrl(),c=ie(a,e.host,e._protocol),u="GET",o=e.maxOperationRetryTime,l=new re(c,u,Et(e,t.bucket),o);return l.urlParams=r,l.errorHandler=oe(t),l}function yt(e,t){const n=t.fullServerUrl(),s=ie(n,e.host,e._protocol),i="DELETE",r=e.maxOperationRetryTime;function a(u,o){}const c=new re(s,i,a,r);return c.successCodes=[200,204],c.errorHandler=Tt(t),c}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=O.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=O.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=O.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,i,r){if(this.sent_)throw I("cannot .send() more than once");if(Q(t)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),r!==void 0)for(const a in r)r.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,r[a].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw I("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw I("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw I("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw I("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class vt extends xt{initXhr(){this.xhr_.responseType="text"}}function ae(){return new vt}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(t,n){this._service=t,n instanceof w?this._location=n:this._location=w.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new D(t,n)}get root(){const t=new w(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return mt(this._location.path)}get storage(){return this._service}get parent(){const t=_t(this._location.path);if(t===null)return null;const n=new w(this._location.bucket,t);return new D(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw et(t)}}function At(e){const t={prefixes:[],items:[]};return ce(e,t).then(()=>t)}async function ce(e,t,n){const i=await Ot(e,{pageToken:n});t.prefixes.push(...i.prefixes),t.items.push(...i.items),i.nextPageToken!=null&&await ce(e,t,i.nextPageToken)}function Ot(e,t){t!=null&&typeof t.maxResults=="number"&&q("options.maxResults",1,1e3,t.maxResults);const n=t||{},s=kt(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(s,ae)}function Dt(e){e._throwIfRoot("deleteObject");const t=yt(e.storage,e._location);return e.storage.makeRequestWithTokens(t,ae)}function It(e,t){const n=gt(e._location.path,t),s=new w(e._location.bucket,n);return new D(e.storage,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ct(e){return/^[A-Za-z]+:\/\//.test(e)}function Nt(e,t){return new D(e,t)}function ue(e,t){if(e instanceof B){const n=e;if(n._bucket==null)throw Qe();const s=new D(n,n._bucket);return t!=null?ue(s,t):s}else return t!==void 0?It(e,t):e}function Pt(e,t){if(t&&Ct(t)){if(e instanceof B)return Nt(e,t);throw H("To use ref(service, url), the first argument must be a Storage instance.")}else return ue(e,t)}function Y(e,t){const n=t==null?void 0:t[te];return n==null?null:w.makeFromBucketSpec(n,e)}function Ut(e,t,n,s={}){e.host=`${t}:${n}`;const i=Q(t);i&&Se(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(e._overrideAuthToken=typeof r=="string"?r:Le(r,e.app.options.projectId))}class B{constructor(t,n,s,i,r,a=!1){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=a,this._bucket=null,this._host=ee,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=qe,this._maxUploadRetryTime=Be,this._requests=new Set,i!=null?this._bucket=w.makeFromBucketSpec(i,this._host):this._bucket=Y(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=w.makeFromBucketSpec(this._url,t):this._bucket=Y(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){q("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){q("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(je(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new D(this,t)}_makeRequest(t,n,s,i,r=!0){if(this._deleted)return new tt(se());{const a=ft(t,this._appId,s,i,n,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,n){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,i).getPromise()}}const Z="@firebase/storage",J="0.14.5";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const le="storage";function St(e){return e=S(e),At(e)}function Lt(e){return e=S(e),Dt(e)}function jt(e,t){return e=S(e),Pt(e,t)}function Ft(e=Ue(),t){e=S(e);const s=Ne(e,le).getImmediate({identifier:t}),i=Pe("storage");return i&&Mt(s,...i),s}function Mt(e,t,n,s={}){Ut(e,t,n,s)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function $t(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new B(n,s,i,t,He)}function Ht(){Me(new $e(le,$t,"PUBLIC").setMultipleInstances(!0)),G(Z,J,""),G(Z,J,"esm2020")}Ht();function qt(e){if(!e||typeof e!="object")return!1;const t=e;return t.code==="storage/bucket-not-found"||t.code==="storage/unknown"&&t.status===404}async function Bt(e,t){var i,r,a;if((await F(A(R,"users",e.uid,"security","mfaPolicy"))).exists()){const u=(await e.getIdTokenResult(!0)).claims.firebase;if((u==null?void 0:u.sign_in_second_factor)!=="totp")throw new Error("Complete your configured authenticator challenge before deleting this account.");return}const s=await F(A(R,"users",e.uid,"security","mfa"));if((i=s.data())!=null&&i.enabled){if(!fe(s.data().secretKey,t))throw new Error("Enter a valid authenticator code.");pe(e.uid);const c=await F(A(R,"users",e.uid,"security","mfaSession"));c.exists()&&(((a=(r=c.data().expiresAt)==null?void 0:r.toMillis)==null?void 0:a.call(r))??0)<=Date.now()&&await _e(t)}}async function Vt(e,t,n){const s=e.uid,i=()=>{var o;if(((o=Ee.currentUser)==null?void 0:o.uid)!==s)throw new Error("Sign in to the same account to finish deleting it.");if(!navigator.onLine)throw new Error("Reconnect to finish deleting this account.")},r=o=>{i(),Te(s,{started:!0,phase:o}),n(o)};async function a(o){for(;;){i();const l=await ke(N(o,ye(400)));if(l.empty)return;i();const f=xe(R);l.docs.forEach(g=>f.delete(g.ref)),await f.commit()}}i(),r("Waiting for pending writes"),await ge(),await me(R),r("Deleting workspace content");for(const o of["tasks","categories","notes","drafts","timerPauses","timerActivity"])await a(N(M(R,"users",s,o)));r("Deleting username and activity"),await a(N(M(R,"usernames"),V("uid","==",s))),await a(N(M(R,"activityLogs"),V("actorUid","==",s))),r("Deleting security settings"),await P(A(R,"users",s,"security","mfa")),await P(A(R,"users",s,"security","mfaSession")),r("Deleting profile"),await P(A(R,"users",s,"profile","main")),await P(A(R,"users",s)),r("Deleting uploaded files");const c=Ft(ve);async function u(o){i();const l=await St(o);for(const f of l.items){i();try{await Lt(f)}catch(g){if(g.code!=="storage/object-not-found")throw g}}for(const f of l.prefixes)await u(f)}try{await u(jt(c,`users/${s}`))}catch(o){if(!qt(o))throw o}r("Clearing local workspace"),await we(s),await be(s),r("Deleting sign-in account");try{await e.delete()}catch(o){if(o.code!=="auth/requires-recent-login")throw o;await t(),await e.delete()}for(const o of[localStorage,sessionStorage])for(const l of Object.keys(o))l.includes(s)&&(l.startsWith("es-todo")||l.startsWith("op-todo"))&&o.removeItem(l);localStorage.removeItem(Re(s)),window.dispatchEvent(new Event("op-todo-account-deleted"))}function Jt({auth:e,profile:t}){var x;v.useEffect(()=>{document.documentElement.dataset.appVersion="v2"},[]);const n=Ae(),[s,i]=v.useState(""),[r,a]=v.useState(""),[c,u]=v.useState(""),[o,l]=v.useState(!1),[f,g]=v.useState(((x=K(e.user.uid))==null?void 0:x.phase)??"Confirm account deletion"),[k,T]=v.useState(""),d=K(e.user.uid);async function m(){const b=e.user;if(!(!b||o||c!=="DELETE"||t!=null&&t.disabled)){l(!0),T("");try{if(!navigator.onLine)throw new Error("Connect before deleting this account.");await e.reauthenticateForSensitiveAction(s,r),await Bt(b,r),await Vt(b,()=>e.reauthenticateForSensitiveAction(s,r),g)}catch(y){T(Ce(y,"Deletion stopped. Reconnect or re-authenticate, then finish deleting."))}finally{l(!1),i(""),a("")}}}return h.jsx(Oe,{open:!0,title:"Delete account",busy:o||!!(d!=null&&d.started),onClose:()=>{window.location.hash="account",W(e.user.uid)},children:h.jsxs("div",{className:"v2-delete-account",children:[h.jsx("h1",{children:d!=null&&d.started?"Account deletion did not finish":"Delete account"}),t!=null&&t.disabled?h.jsx("p",{role:"alert",children:"Contact support to delete this account."}):h.jsxs(h.Fragment,{children:[h.jsx("p",{children:"This permanently deletes your tasks, notes, projects, images, history and sign-in account. It cannot be undone."}),n.isPro?h.jsxs("aside",{className:"banner",children:[h.jsx("strong",{children:"Deleting your account does not cancel Google Play billing."}),h.jsx("p",{children:"Cancel your subscription separately to stop future charges."}),de()?h.jsx("a",{href:De(n.managementUrl),target:"_blank",rel:"noreferrer",children:"Manage in Google Play"}):h.jsx("p",{children:"Manage your subscription in the OP To-Do Android app or Google Play."})]}):null,h.jsx("p",{className:"v2-help",children:"Keep this app open and connected. Workspace changes on this device are paused. Close the app on other signed-in devices first: another device can recreate data while deletion runs."}),h.jsx("p",{className:"v2-help",children:"A server-owned MFA policy marker and rate-limit records may remain. Disabled accounts require support."}),h.jsxs("form",{className:"stack",onSubmit:b=>{b.preventDefault(),m()},children:[Ie(e.user)?h.jsxs("label",{children:["Current password",h.jsx("input",{type:"password",autoComplete:"current-password",value:s,onChange:b=>i(b.target.value),disabled:o,required:!0})]}):h.jsx("p",{children:"You will confirm your Google sign-in before deletion starts."}),e.totpEnabled?h.jsxs("label",{children:["Authenticator code",h.jsx("input",{inputMode:"numeric",autoComplete:"one-time-code",value:r,onChange:b=>a(b.target.value),disabled:o})]}):null,h.jsxs("label",{children:["Type DELETE to confirm",h.jsx("input",{value:c,onChange:b=>u(b.target.value),autoComplete:"off",disabled:o})]}),h.jsx("button",{className:"button button-danger",disabled:o||c!=="DELETE",children:o?f:d!=null&&d.started?"Finish deleting":"Delete account permanently"})]}),h.jsx("p",{role:"status",children:o?f:"Re-authentication is required before deleting anything."}),k?h.jsxs("p",{role:"alert",children:[f,": ",k]}):null]}),d!=null&&d.started?null:h.jsx("button",{className:"button button-secondary",disabled:o,onClick:()=>{window.location.hash="account",W(e.user.uid)},children:"Cancel and return to account"})]})})}export{Jt as DeleteAccount};
