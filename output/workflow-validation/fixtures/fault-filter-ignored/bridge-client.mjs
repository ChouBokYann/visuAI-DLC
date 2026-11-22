export function createClient({url,token,fetchImpl=fetch}) {
  if (url !== 'http://host.docker.internal:17820/infer') throw Error('Invalid bridge endpoint');
  if (typeof token !== 'string' || !token.trim()) throw Error('Missing bridge token');
  return async (question,sources) => {
    try {
      const response = await fetchImpl(url,{
        method:'POST',
        headers:{'content-type':'application/json',authorization:`Bearer ${token}`},
        body:JSON.stringify({mode:'qa',question,sources:sources.map(({name,text})=>({name,text}))}),
        redirect:'error',
        signal:AbortSignal.timeout(125000)
      });
      if (!response.ok) throw Error('Unavailable');
      const result = await response.json();
      if (!result || typeof result.answer !== 'string' || !result.answer.trim() || !Number.isInteger(result.turn) || result.turn <= 0 || result.stopReason !== 'end_turn') throw Error('Invalid result');
      return {answer:result.answer,turn:result.turn,stopReason:result.stopReason};
    } catch {
      throw Error('Inference bridge unavailable or returned an invalid answer');
    }
  };
}
