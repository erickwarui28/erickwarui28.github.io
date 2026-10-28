import{i as se,r as v,j as h,a as we}from"./index-D1fb2yiZ.js";import{ax as F,d as A,a as E,ay as be,az as Re,aA as Ee,aB as H,aC as K,aD as W,aE as G,aF as Te,aG as X,aH as ke,aI as ye,v as N,c as M,y as z,aJ as P,aK as xe,au as ve,q as Ae,z as De,aL as Oe,_ as Ie,an as Ce,aM as Ne,aN as Pe,aO as Y,R as Ue}from"./App-DXacK-81.js";import{v as ie,b as Se}from"./client-BeMVIewV.js";import{b as S,_ as Le,a as je,g as Fe,i as re,p as Me,c as $e,m as He,F as Be,n as qe,C as Ve,r as Z,S as Ke,w as We,x as Ge}from"./VpsAuthGate-DrNGHhyB.js";import"./sentry-CwSz-mus.js";import"./index-DDO0YvoL.js";import"./browser-BFTWkmOk.js";/**
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
 */const oe="firebasestorage.googleapis.com",ae="storageBucket",Xe=120*1e3,ze=600*1e3;/**
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
 */class g extends Be{constructor(t,n,s=0){super($(t),`Firebase Storage: ${n} (${$(t)})`),this.status_=s,this.customData={serverResponse:null},this._baseMessage=this.message,Object.setPrototypeOf(this,g.prototype)}get status(){return this.status_}set status(t){this.status_=t}_codeEquals(t){return $(t)===this.code}get serverResponse(){return this.customData.serverResponse}set serverResponse(t){this.customData.serverResponse=t,this.customData.serverResponse?this.message=`${this._baseMessage}
${this.customData.serverResponse}`:this.message=this._baseMessage}}var _;(function(e){e.UNKNOWN="unknown",e.OBJECT_NOT_FOUND="object-not-found",e.BUCKET_NOT_FOUND="bucket-not-found",e.PROJECT_NOT_FOUND="project-not-found",e.QUOTA_EXCEEDED="quota-exceeded",e.UNAUTHENTICATED="unauthenticated",e.UNAUTHORIZED="unauthorized",e.UNAUTHORIZED_APP="unauthorized-app",e.RETRY_LIMIT_EXCEEDED="retry-limit-exceeded",e.INVALID_CHECKSUM="invalid-checksum",e.CANCELED="canceled",e.INVALID_EVENT_NAME="invalid-event-name",e.INVALID_URL="invalid-url",e.INVALID_DEFAULT_BUCKET="invalid-default-bucket",e.NO_DEFAULT_BUCKET="no-default-bucket",e.CANNOT_SLICE_BLOB="cannot-slice-blob",e.SERVER_FILE_WRONG_SIZE="server-file-wrong-size",e.NO_DOWNLOAD_URL="no-download-url",e.INVALID_ARGUMENT="invalid-argument",e.INVALID_ARGUMENT_COUNT="invalid-argument-count",e.APP_DELETED="app-deleted",e.INVALID_ROOT_OPERATION="invalid-root-operation",e.INVALID_FORMAT="invalid-format",e.INTERNAL_ERROR="internal-error",e.UNSUPPORTED_ENVIRONMENT="unsupported-environment"})(_||(_={}));function $(e){return"storage/"+e}function ce(){const e="An unknown error occurred, please check the error payload for server response.";return new g(_.UNKNOWN,e)}function Ye(e){return new g(_.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}function Ze(e){return new g(_.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}function Je(){const e="User is not authenticated, please authenticate using Firebase Authentication and try again.";return new g(_.UNAUTHENTICATED,e)}function Qe(){return new g(_.UNAUTHORIZED_APP,"This app does not have permission to access Firebase Storage on this project.")}function et(e){return new g(_.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}function tt(){return new g(_.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again.")}function nt(){return new g(_.CANCELED,"User canceled the upload/download.")}function st(e){return new g(_.INVALID_URL,"Invalid URL '"+e+"'.")}function it(e){return new g(_.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}function rt(){return new g(_.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+ae+"' property when initializing the app?")}function B(e){return new g(_.INVALID_ARGUMENT,e)}function ue(){return new g(_.APP_DELETED,"The Firebase app was deleted.")}function ot(e){return new g(_.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}function I(e){throw new g(_.INTERNAL_ERROR,"Internal error: "+e)}/**
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
 */class w{constructor(t,n){this.bucket=t,this.path_=n}get path(){return this.path_}get isRoot(){return this.path.length===0}fullServerUrl(){const t=encodeURIComponent;return"/b/"+t(this.bucket)+"/o/"+t(this.path)}bucketOnlyServerUrl(){return"/b/"+encodeURIComponent(this.bucket)+"/o"}static makeFromBucketSpec(t,n){let s;try{s=w.makeFromUrl(t,n)}catch{return new w(t,"")}if(s.path==="")return s;throw it(t)}static makeFromUrl(t,n){let s=null;const i="([A-Za-z0-9.\\-_]+)";function r(T){T.path.charAt(T.path.length-1)==="/"&&(T.path_=T.path_.slice(0,-1))}const a="(/(.*))?$",c=new RegExp("^gs://"+i+a,"i"),u={bucket:1,path:3};function l(T){T.path_=decodeURIComponent(T.path)}const o="v[A-Za-z0-9_]+",d=n.replace(/[.]/g,"\\."),p="(/([^?#]*).*)?$",b=new RegExp(`^https?://${d}/${o}/b/${i}/o${p}`,"i"),k={bucket:1,path:3},f=n===oe?"(?:storage.googleapis.com|storage.cloud.google.com)":n,m="([^?#]*)",x=new RegExp(`^https?://${f}/${i}/${m}`,"i"),y=[{regex:c,indices:u,postModify:r},{regex:b,indices:k,postModify:l},{regex:x,indices:{bucket:1,path:2},postModify:l}];for(let T=0;T<y.length;T++){const C=y[T],L=C.regex.exec(t);if(L){const me=L[C.indices.bucket];let j=L[C.indices.path];j||(j=""),s=new w(me,j),C.postModify(s);break}}if(s==null)throw st(t);return s}}class at{constructor(t){this.promise_=Promise.reject(t)}getPromise(){return this.promise_}cancel(t=!1){}}/**
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
 */function ct(e,t,n){let s=1,i=null,r=null,a=!1,c=0;function u(){return c===2}let l=!1;function o(...m){l||(l=!0,t.apply(null,m))}function d(m){i=setTimeout(()=>{i=null,e(b,u())},m)}function p(){r&&clearTimeout(r)}function b(m,...x){if(l){p();return}if(m){p(),o.call(null,m,...x);return}if(u()||a){p(),o.call(null,m,...x);return}s<64&&(s*=2);let y;c===1?(c=2,y=0):y=(s+Math.random())*1e3,d(y)}let k=!1;function f(m){k||(k=!0,p(),!l&&(i!==null?(m||(c=2),clearTimeout(i),d(0)):m||(c=1)))}return d(0),r=setTimeout(()=>{a=!0,f(!0)},n),f}function ut(e){e(!1)}/**
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
 */function lt(e){return e!==void 0}function ht(e){return typeof e=="object"&&!Array.isArray(e)}function q(e,t,n,s){if(s<t)throw B(`Invalid value for '${e}'. Expected ${t} or greater.`);if(s>n)throw B(`Invalid value for '${e}'. Expected ${n} or less.`)}/**
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
 */function le(e,t,n){let s=t;return n==null&&(s=`https://${t}`),`${n}://${s}/v0${e}`}function dt(e){const t=encodeURIComponent;let n="?";for(const s in e)if(e.hasOwnProperty(s)){const i=t(s)+"="+t(e[s]);n=n+i+"&"}return n=n.slice(0,-1),n}var D;(function(e){e[e.NO_ERROR=0]="NO_ERROR",e[e.NETWORK_ERROR=1]="NETWORK_ERROR",e[e.ABORT=2]="ABORT"})(D||(D={}));/**
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
 */function ft(e,t){const n=e>=500&&e<600,i=[408,429].indexOf(e)!==-1,r=t.indexOf(e)!==-1;return n||i||r}/**
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
 */class pt{constructor(t,n,s,i,r,a,c,u,l,o,d,p=!0,b=!1){this.url_=t,this.method_=n,this.headers_=s,this.body_=i,this.successCodes_=r,this.additionalRetryCodes_=a,this.callback_=c,this.errorCallback_=u,this.timeout_=l,this.progressCallback_=o,this.connectionFactory_=d,this.retry=p,this.isUsingEmulator=b,this.pendingConnection_=null,this.backoffId_=null,this.canceled_=!1,this.appDelete_=!1,this.promise_=new Promise((k,f)=>{this.resolve_=k,this.reject_=f,this.start_()})}start_(){const t=(s,i)=>{if(i){s(!1,new U(!1,null,!0));return}const r=this.connectionFactory_();this.pendingConnection_=r;const a=c=>{const u=c.loaded,l=c.lengthComputable?c.total:-1;this.progressCallback_!==null&&this.progressCallback_(u,l)};this.progressCallback_!==null&&r.addUploadProgressListener(a),r.send(this.url_,this.method_,this.isUsingEmulator,this.body_,this.headers_).then(()=>{this.progressCallback_!==null&&r.removeUploadProgressListener(a),this.pendingConnection_=null;const c=r.getErrorCode()===D.NO_ERROR,u=r.getStatus();if(!c||ft(u,this.additionalRetryCodes_)&&this.retry){const o=r.getErrorCode()===D.ABORT;s(!1,new U(!1,null,o));return}const l=this.successCodes_.indexOf(u)!==-1;s(!0,new U(l,r))})},n=(s,i)=>{const r=this.resolve_,a=this.reject_,c=i.connection;if(i.wasSuccessCode)try{const u=this.callback_(c,c.getResponse());lt(u)?r(u):r()}catch(u){a(u)}else if(c!==null){const u=ce();u.serverResponse=c.getErrorText(),this.errorCallback_?a(this.errorCallback_(c,u)):a(u)}else if(i.canceled){const u=this.appDelete_?ue():nt();a(u)}else{const u=tt();a(u)}};this.canceled_?n(!1,new U(!1,null,!0)):this.backoffId_=ct(t,n,this.timeout_)}getPromise(){return this.promise_}cancel(t){this.canceled_=!0,this.appDelete_=t||!1,this.backoffId_!==null&&ut(this.backoffId_),this.pendingConnection_!==null&&this.pendingConnection_.abort()}}class U{constructor(t,n,s){this.wasSuccessCode=t,this.connection=n,this.canceled=!!s}}function _t(e,t){t!==null&&t.length>0&&(e.Authorization="Firebase "+t)}function gt(e,t){e["X-Firebase-Storage-Version"]="webjs/"+(t??"AppManager")}function mt(e,t){t&&(e["X-Firebase-GMPID"]=t)}function wt(e,t){t!==null&&(e["X-Firebase-AppCheck"]=t)}function bt(e,t,n,s,i,r,a=!0,c=!1){const u=dt(e.urlParams),l=e.url+u,o=Object.assign({},e.headers);return mt(o,t),_t(o,n),gt(o,r),wt(o,s),new pt(l,e.method,o,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,i,a,c)}/**
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
 */function Rt(e){let t;try{t=JSON.parse(e)}catch{return null}return ht(t)?t:null}/**
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
 */function Et(e){if(e.length===0)return null;const t=e.lastIndexOf("/");return t===-1?"":e.slice(0,t)}function Tt(e,t){const n=t.split("/").filter(s=>s.length>0).join("/");return e.length===0?n:e+"/"+n}function kt(e){const t=e.lastIndexOf("/",e.length-2);return t===-1?e:e.slice(t+1)}/**
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
 */const J="prefixes",Q="items";function yt(e,t,n){const s={prefixes:[],items:[],nextPageToken:n.nextPageToken};if(n[J])for(const i of n[J]){const r=i.replace(/\/$/,""),a=e._makeStorageReference(new w(t,r));s.prefixes.push(a)}if(n[Q])for(const i of n[Q]){const r=e._makeStorageReference(new w(t,i.name));s.items.push(r)}return s}function xt(e,t,n){const s=Rt(n);return s===null?null:yt(e,t,s)}class he{constructor(t,n,s,i){this.url=t,this.method=n,this.handler=s,this.timeout=i,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]}}/**
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
 */function vt(e){if(!e)throw ce()}function At(e,t){function n(s,i){const r=xt(e,t,i);return vt(r!==null),r}return n}function de(e){function t(n,s){let i;return n.getStatus()===401?n.getErrorText().includes("Firebase App Check token is invalid")?i=Qe():i=Je():n.getStatus()===402?i=Ze(e.bucket):n.getStatus()===403?i=et(e.path):i=s,i.status=n.getStatus(),i.serverResponse=s.serverResponse,i}return t}function Dt(e){const t=de(e);function n(s,i){let r=t(s,i);return s.getStatus()===404&&(r=Ye(e.path)),r.serverResponse=i.serverResponse,r}return n}function Ot(e,t,n,s,i){const r={};t.isRoot?r.prefix="":r.prefix=t.path+"/",n.length>0&&(r.delimiter=n),s&&(r.pageToken=s),i&&(r.maxResults=i);const a=t.bucketOnlyServerUrl(),c=le(a,e.host,e._protocol),u="GET",l=e.maxOperationRetryTime,o=new he(c,u,At(e,t.bucket),l);return o.urlParams=r,o.errorHandler=de(t),o}function It(e,t){const n=t.fullServerUrl(),s=le(n,e.host,e._protocol),i="DELETE",r=e.maxOperationRetryTime;function a(u,l){}const c=new he(s,i,a,r);return c.successCodes=[200,204],c.errorHandler=Dt(t),c}/**
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
 */class Ct{constructor(){this.sent_=!1,this.xhr_=new XMLHttpRequest,this.initXhr(),this.errorCode_=D.NO_ERROR,this.sendPromise_=new Promise(t=>{this.xhr_.addEventListener("abort",()=>{this.errorCode_=D.ABORT,t()}),this.xhr_.addEventListener("error",()=>{this.errorCode_=D.NETWORK_ERROR,t()}),this.xhr_.addEventListener("load",()=>{t()})})}send(t,n,s,i,r){if(this.sent_)throw I("cannot .send() more than once");if(re(t)&&s&&(this.xhr_.withCredentials=!0),this.sent_=!0,this.xhr_.open(n,t,!0),r!==void 0)for(const a in r)r.hasOwnProperty(a)&&this.xhr_.setRequestHeader(a,r[a].toString());return i!==void 0?this.xhr_.send(i):this.xhr_.send(),this.sendPromise_}getErrorCode(){if(!this.sent_)throw I("cannot .getErrorCode() before sending");return this.errorCode_}getStatus(){if(!this.sent_)throw I("cannot .getStatus() before sending");try{return this.xhr_.status}catch{return-1}}getResponse(){if(!this.sent_)throw I("cannot .getResponse() before sending");return this.xhr_.response}getErrorText(){if(!this.sent_)throw I("cannot .getErrorText() before sending");return this.xhr_.statusText}abort(){this.xhr_.abort()}getResponseHeader(t){return this.xhr_.getResponseHeader(t)}addUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.addEventListener("progress",t)}removeUploadProgressListener(t){this.xhr_.upload!=null&&this.xhr_.upload.removeEventListener("progress",t)}}class Nt extends Ct{initXhr(){this.xhr_.responseType="text"}}function fe(){return new Nt}/**
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
 */class O{constructor(t,n){this._service=t,n instanceof w?this._location=n:this._location=w.makeFromUrl(n,t.host)}toString(){return"gs://"+this._location.bucket+"/"+this._location.path}_newRef(t,n){return new O(t,n)}get root(){const t=new w(this._location.bucket,"");return this._newRef(this._service,t)}get bucket(){return this._location.bucket}get fullPath(){return this._location.path}get name(){return kt(this._location.path)}get storage(){return this._service}get parent(){const t=Et(this._location.path);if(t===null)return null;const n=new w(this._location.bucket,t);return new O(this._service,n)}_throwIfRoot(t){if(this._location.path==="")throw ot(t)}}function Pt(e){const t={prefixes:[],items:[]};return pe(e,t).then(()=>t)}async function pe(e,t,n){const i=await Ut(e,{pageToken:n});t.prefixes.push(...i.prefixes),t.items.push(...i.items),i.nextPageToken!=null&&await pe(e,t,i.nextPageToken)}function Ut(e,t){t!=null&&typeof t.maxResults=="number"&&q("options.maxResults",1,1e3,t.maxResults);const n=t||{},s=Ot(e.storage,e._location,"/",n.pageToken,n.maxResults);return e.storage.makeRequestWithTokens(s,fe)}function St(e){e._throwIfRoot("deleteObject");const t=It(e.storage,e._location);return e.storage.makeRequestWithTokens(t,fe)}function Lt(e,t){const n=Tt(e._location.path,t),s=new w(e._location.bucket,n);return new O(e.storage,s)}/**
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
 */function jt(e){return/^[A-Za-z]+:\/\//.test(e)}function Ft(e,t){return new O(e,t)}function _e(e,t){if(e instanceof V){const n=e;if(n._bucket==null)throw rt();const s=new O(n,n._bucket);return t!=null?_e(s,t):s}else return t!==void 0?Lt(e,t):e}function Mt(e,t){if(t&&jt(t)){if(e instanceof V)return Ft(e,t);throw B("To use ref(service, url), the first argument must be a Storage instance.")}else return _e(e,t)}function ee(e,t){const n=t==null?void 0:t[ae];return n==null?null:w.makeFromBucketSpec(n,e)}function $t(e,t,n,s={}){e.host=`${t}:${n}`;const i=re(t);i&&Me(`https://${e.host}/b`),e._isUsingEmulator=!0,e._protocol=i?"https":"http";const{mockUserToken:r}=s;r&&(e._overrideAuthToken=typeof r=="string"?r:$e(r,e.app.options.projectId))}class V{constructor(t,n,s,i,r,a=!1){this.app=t,this._authProvider=n,this._appCheckProvider=s,this._url=i,this._firebaseVersion=r,this._isUsingEmulator=a,this._bucket=null,this._host=oe,this._protocol="https",this._appId=null,this._deleted=!1,this._maxOperationRetryTime=Xe,this._maxUploadRetryTime=ze,this._requests=new Set,i!=null?this._bucket=w.makeFromBucketSpec(i,this._host):this._bucket=ee(this._host,this.app.options)}get host(){return this._host}set host(t){this._host=t,this._url!=null?this._bucket=w.makeFromBucketSpec(this._url,t):this._bucket=ee(t,this.app.options)}get maxUploadRetryTime(){return this._maxUploadRetryTime}set maxUploadRetryTime(t){q("time",0,Number.POSITIVE_INFINITY,t),this._maxUploadRetryTime=t}get maxOperationRetryTime(){return this._maxOperationRetryTime}set maxOperationRetryTime(t){q("time",0,Number.POSITIVE_INFINITY,t),this._maxOperationRetryTime=t}async _getAuthToken(){if(this._overrideAuthToken)return this._overrideAuthToken;const t=this._authProvider.getImmediate({optional:!0});if(t){const n=await t.getToken();if(n!==null)return n.accessToken}return null}async _getAppCheckToken(){if(He(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const t=this._appCheckProvider.getImmediate({optional:!0});return t?(await t.getToken()).token:null}_delete(){return this._deleted||(this._deleted=!0,this._requests.forEach(t=>t.cancel()),this._requests.clear()),Promise.resolve()}_makeStorageReference(t){return new O(this,t)}_makeRequest(t,n,s,i,r=!0){if(this._deleted)return new at(ue());{const a=bt(t,this._appId,s,i,n,this._firebaseVersion,r,this._isUsingEmulator);return this._requests.add(a),a.getPromise().then(()=>this._requests.delete(a),()=>this._requests.delete(a)),a}}async makeRequestWithTokens(t,n){const[s,i]=await Promise.all([this._getAuthToken(),this._getAppCheckToken()]);return this._makeRequest(t,n,s,i).getPromise()}}const te="@firebase/storage",ne="0.14.5";/**
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
 */const ge="storage";function Ht(e){return e=S(e),Pt(e)}function Bt(e){return e=S(e),St(e)}function qt(e,t){return e=S(e),Mt(e,t)}function Vt(e=Fe(),t){e=S(e);const s=Le(e,ge).getImmediate({identifier:t}),i=je("storage");return i&&Kt(s,...i),s}function Kt(e,t,n,s={}){$t(e,t,n,s)}/**
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
 */function Wt(e,{instanceIdentifier:t}){const n=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return new V(n,s,i,t,Ke)}function Gt(){qe(new Ve(ge,Wt,"PUBLIC").setMultipleInstances(!0)),Z(te,ne,""),Z(te,ne,"esm2020")}Gt();function Xt(e){if(!e||typeof e!="object")return!1;const t=e;return t.code==="storage/bucket-not-found"||t.code==="storage/unknown"&&t.status===404}async function zt(e,t){var i,r,a;if(se()){await ie("/account/verify-mfa",{code:t});return}if((await F(A(E,"users",e.uid,"security","mfaPolicy"))).exists()){const u=(await e.getIdTokenResult(!0)).claims.firebase;if((u==null?void 0:u.sign_in_second_factor)!=="totp")throw new Error("Complete your configured authenticator challenge before deleting this account.");return}const s=await F(A(E,"users",e.uid,"security","mfa"));if((i=s.data())!=null&&i.enabled){if(!be(s.data().secretKey,t))throw new Error("Enter a valid authenticator code.");Re(e.uid);const c=await F(A(E,"users",e.uid,"security","mfaSession"));c.exists()&&(((a=(r=c.data().expiresAt)==null?void 0:r.toMillis)==null?void 0:a.call(r))??0)<=Date.now()&&await Ee(t)}}async function Yt(e,t,n){var l;const s=e.uid;if(se()){if(((l=H(s))==null?void 0:l.phase)!=="Deleting sign-in account"&&(await t(),n("Deleting workspace and account"),await ie("/account/delete",{}),K(s,{started:!0,phase:"Deleting sign-in account"})),await W(s),await G(s),await Te(),We()){n("Deleting sign-in account");const o=Ge().currentUser;if(!o||o.uid!==s)throw Error("Sign in to the same account to finish deleting it.");await o.delete()}localStorage.removeItem(X(s)),Se(null);return}const i=()=>{var o;if(((o=xe.currentUser)==null?void 0:o.uid)!==s)throw new Error("Sign in to the same account to finish deleting it.");if(!navigator.onLine)throw new Error("Reconnect to finish deleting this account.")},r=o=>{i(),K(s,{started:!0,phase:o}),n(o)};async function a(o){for(;;){i();const d=await ve(N(o,Ae(400)));if(d.empty)return;i();const p=De(E);d.docs.forEach(b=>p.delete(b.ref)),await p.commit()}}i(),r("Waiting for pending writes"),await ke(),await ye(E),r("Deleting workspace content");for(const o of["tasks","categories","notes","drafts","timerPauses","timerActivity"])await a(N(M(E,"users",s,o)));r("Deleting username and activity"),await a(N(M(E,"usernames"),z("uid","==",s))),await a(N(M(E,"activityLogs"),z("actorUid","==",s))),r("Deleting security settings"),await P(A(E,"users",s,"security","mfa")),await P(A(E,"users",s,"security","mfaSession")),r("Deleting profile"),await P(A(E,"users",s,"profile","main")),await P(A(E,"users",s)),r("Deleting uploaded files");const c=Vt(Oe);async function u(o){i();const d=await Ht(o);for(const p of d.items){i();try{await Bt(p)}catch(b){if(b.code!=="storage/object-not-found")throw b}}for(const p of d.prefixes)await u(p)}try{await u(qt(c,`users/${s}`))}catch(o){if(!Xt(o))throw o}r("Clearing local workspace"),await W(s),await G(s),r("Deleting sign-in account");try{await e.delete()}catch(o){if(o.code!=="auth/requires-recent-login")throw o;await t(),await e.delete()}for(const o of[localStorage,sessionStorage])for(const d of Object.keys(o))d.includes(s)&&(d.startsWith("es-todo")||d.startsWith("op-todo"))&&o.removeItem(d);localStorage.removeItem(X(s)),window.dispatchEvent(new Event("op-todo-account-deleted"))}function rn({auth:e,profile:t}){var x;v.useEffect(()=>{document.documentElement.dataset.appVersion="v2"},[]);const n=Ie(),[s,i]=v.useState(""),[r,a]=v.useState(""),[c,u]=v.useState(""),[l,o]=v.useState(!1),[d,p]=v.useState(((x=H(e.user.uid))==null?void 0:x.phase)??"Confirm account deletion"),[b,k]=v.useState(""),f=H(e.user.uid);async function m(){const R=e.user;if(!(!R||l||c!=="DELETE"||t!=null&&t.disabled)){o(!0),k("");try{if(!navigator.onLine)throw new Error("Connect before deleting this account.");await e.reauthenticateForSensitiveAction(s,r),await zt(R,r),await Yt(R,()=>e.reauthenticateForSensitiveAction(s,r),p)}catch(y){k(Ue(y,"Deletion stopped. Reconnect or re-authenticate, then finish deleting."))}finally{o(!1),i(""),a("")}}}return h.jsx(Ce,{open:!0,title:"Delete account",busy:l||!!(f!=null&&f.started),onClose:()=>{window.location.hash="account",Y(e.user.uid)},children:h.jsxs("div",{className:"v2-delete-account",children:[h.jsx("h1",{children:f!=null&&f.started?"Account deletion did not finish":"Delete account"}),t!=null&&t.disabled?h.jsx("p",{role:"alert",children:"Contact support to delete this account."}):h.jsxs(h.Fragment,{children:[h.jsx("p",{children:"This permanently deletes your tasks, notes, projects, images, history and sign-in account. It cannot be undone."}),n.isPro?h.jsxs("aside",{className:"banner",children:[h.jsx("strong",{children:"Deleting your account does not cancel Google Play billing."}),h.jsx("p",{children:"Cancel your subscription separately to stop future charges."}),we()?h.jsx("a",{href:Ne(n.managementUrl),target:"_blank",rel:"noreferrer",children:"Manage in Google Play"}):h.jsx("p",{children:"Manage your subscription in the OP To-Do Android app or Google Play."})]}):null,h.jsx("p",{className:"v2-help",children:"Keep this app open and connected. Workspace changes on this device are paused. Close the app on other signed-in devices first: another device can recreate data while deletion runs."}),h.jsx("p",{className:"v2-help",children:"A server-owned MFA policy marker and rate-limit records may remain. Disabled accounts require support."}),h.jsxs("form",{className:"stack",onSubmit:R=>{R.preventDefault(),m()},children:[Pe(e.user)?h.jsxs("label",{children:["Current password",h.jsx("input",{type:"password",autoComplete:"current-password",value:s,onChange:R=>i(R.target.value),disabled:l,required:!0})]}):h.jsx("p",{children:"You will confirm your Google sign-in before deletion starts."}),e.totpEnabled?h.jsxs("label",{children:["Authenticator code",h.jsx("input",{inputMode:"numeric",autoComplete:"one-time-code",value:r,onChange:R=>a(R.target.value),disabled:l})]}):null,h.jsxs("label",{children:["Type DELETE to confirm",h.jsx("input",{value:c,onChange:R=>u(R.target.value),autoComplete:"off",disabled:l})]}),h.jsx("button",{className:"button button-danger",disabled:l||c!=="DELETE",children:l?d:f!=null&&f.started?"Finish deleting":"Delete account permanently"})]}),h.jsx("p",{role:"status",children:l?d:"Re-authentication is required before deleting anything."}),b?h.jsxs("p",{role:"alert",children:[d,": ",b]}):null]}),f!=null&&f.started?null:h.jsx("button",{className:"button button-secondary",disabled:l,onClick:()=>{window.location.hash="account",Y(e.user.uid)},children:"Cancel and return to account"})]})})}export{rn as DeleteAccount};
