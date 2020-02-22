import React from "react";

export const popUpView = ref => {
  var newCaption = null;

  return (
    <div className="form-popup" id="myForm" ref={ree => ref.setPopUpRef(ree)}>
      <form action="/action_page.php" className="form-container">
        <label className="text">
          <b>Caption for the Pic::</b>
        </label>
        <textarea
          rows="4"
          cols="60"
          className="EditValue"
          onChange={e => {
            newCaption = e.target.value;
          }}
        />
        <textarea
          rows="4"
          cols="60"
          className="EditValue"
          onChange={e => {
            newCaption = e.target.value;
          }}
        />

        <button
          type="button"
          className="btn submitCaption"
          onClick={() => {
            ref.sendInfo(newCaption);
          }}
        >
          Submit it::
        </button>
      </form>
    </div>
  );
};
