import React from 'react';

const NextPage = () => {
  return (
    <>
    <div class="bundle">
      <p>Bundle 1</p>
      <p>Select</p>
      <select id="network-options">
        <option value="volte">Volte</option>
        <option value="vonr">VoNR</option>
        <option value="full-network">Full Network</option>
        <option value="5g">5G</option>
      </select>
      <br/>
      <p>Custom</p>
      <input type="text" id="custom-field" placeholder="Enter custom value" />
    </div>
       <div class="bundle">
       <p>Bundle 2</p>
       <p>Select</p>
       <select id="network-options">
         <option value="volte">Volte</option>
         <option value="vonr">VoNR</option>
         <option value="full-network">Full Network</option>
         <option value="5g">5G</option>
       </select>
       <br/>
       <p>Custom</p>
       <input type="text" id="custom-field" placeholder="Enter custom value" />
     </div>
        <div class="bundle">
        <p>Bundle 3</p>
        <p>Select</p>
        <select id="network-options">
          <option value="volte">Volte</option>
          <option value="vonr">VoNR</option>
          <option value="full-network">Full Network</option>
          <option value="5g">5G</option>
        </select>
        <br/>
        <p>Custom</p>
        <input type="text" id="custom-field" placeholder="Enter custom value" />
      </div>
      </>
  );
};

export default NextPage;
