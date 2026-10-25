import {test} from 'node:test';
import assert from 'node:assert/strict';
import {fetchVinyls, normalizeRecord} from './vinyles.mjs';
const url='https://example.org/MyVinyles/vinyl_data.json';
test('covers resolve next to the JSON, placeholders and unknown years are dropped',()=>{
 assert.equal(normalizeRecord({id:9,cover_image:'9.jpg',year:2016},url).cover,'https://example.org/MyVinyles/images/covers/9.jpg');
 assert.equal(normalizeRecord({id:1,cover_image:'default.svg'},url).cover,null);
 assert.equal(normalizeRecord({id:2,cover_image:'',year:-1},url).year,null);
});
test('wishlist items are excluded and recent additions come first',async()=>{
 const result=await fetchVinyls(url,async()=>({ok:true,json:async()=>({records:[{id:1},{id:3},{id:2,owned:false}]})}));
 assert.deepEqual(result.records.map(r=>r.id),[3,1]);
});
test('an unavailable collection aborts instead of emptying the page',async()=>{
 await assert.rejects(()=>fetchVinyls(url,async()=>({ok:false,status:404})),/404/);
 await assert.rejects(()=>fetchVinyls(url,async()=>({ok:true,json:async()=>({})})),/inattendue/);
});
