import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fetchRepos, normalize} from './github.mjs';
test('pagination and exclusion of private repositories',async()=>{
 let calls=0;
 const repos=await fetchRepos('Aguelord',async()=>({ok:true,json:async()=>++calls===1?Array.from({length:100},(_,i)=>({private:i===0})): [{private:false}]}));
 assert.equal(calls,2); assert.equal(repos.length,100);
});
test('an API failure aborts instead of returning an incomplete catalogue',async()=>{
 await assert.rejects(()=>fetchRepos('Aguelord',async()=>({ok:false,status:403})),/403/);
});
test('unsafe demo URLs are discarded',()=>{
 const result=normalize({name:'PyBar',homepage:'javascript:alert(1)'});
 assert.equal(result.id,'pybar'); assert.equal(result.homepage,null);
});
