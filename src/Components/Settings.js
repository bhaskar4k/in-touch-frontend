import '../CSS for Components/Settings.css';
import { React, useState } from 'react';
import Popup from './Popup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Settings() {
    const user_login_info_from_cache = JSON.parse(localStorage.getItem("touch__user_login_info"));
    const logged_in_user_name = user_login_info_from_cache.user_name;


    //#region ------------POPUP-------------------------------------------------------------------------------------------------------------*/
    const [showPopup, setShowPopup] = useState(false);
    const [popup_message, set_popup_message] = useState("");
    const [popup_type, set_popup_type] = useState("");

    // Popup open
    const openPopup = (message, type) => {
        set_popup_message(message);
        set_popup_type(type);
        setShowPopup(true);
    };

    // Popup close
    const closePopup = () => {
        set_popup_message("");
        set_popup_type("");
        setShowPopup(false);
    };
    //#endregion -----------------------------------------------------------------------------------------------------------------------------*/

    //#region ------------VALIDATING FORM INPUT--------------------------------------------------------------------------------------------------*/
    // Check leap year
    function check_leap_year(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                return (year % 400 === 0);
            }
            return true;
        }
        return false;
    }

    // Full validation of all input fields before registration/sign up
    function validate(user_name, birth_date, birth_month, birth_year, field_name) {
        let d = new Date();
        let current_year = d.getFullYear();

        if (field_name === "username") {
            if (user_name[0] < 'a' || user_name[0] > 'z') {
                openPopup("Username can only start characters in between [a to z]", "2");
                return false;
            }
        } else if (field_name === "birthdate") {
            if (birth_date < 1) {
                openPopup("Please enter a valid date", "2");
                return false;
            }

            if (birth_month < 1 || birth_month > 12) {
                openPopup("Please enter a valid month", "2");
                return false;
            }

            if (birth_month === "2") {
                if (check_leap_year(birth_year) === true) {
                    if (birth_date > 29) {
                        openPopup("Please enter a valid date", "2");
                        return false;
                    }
                } else {
                    if (birth_date > 28) {
                        openPopup("Please enter a valid date", "2");
                        return false;
                    }
                }
            } else {
                if (birth_month === "1" || birth_month === "3" || birth_month === "5" || birth_month === "7"
                    || birth_month === "8" || birth_month === "10" || birth_month === "12") {
                    if (birth_date > 31) {
                        openPopup("Please enter a valid date", "2");
                        return false;
                    }
                } else {
                    if (birth_date > 30) {
                        openPopup("Please enter a valid date", "2");
                        return false;
                    }
                }
            }

            if (birth_year < 0 || birth_year > current_year) {
                openPopup("Please enter a valid year", "2");
                return false;
            }
        }

        return true;
    }

    // Detection of any empty field before registration/sign up
    function empty_field_detection(name, field_name) {
        if (name === "" || name === null || name === undefined) {
            openPopup("Please enter " + field_name, "2");
            return false;
        }

        return true;
    }
    //#endregion -------------------------------------------------------------------------------------------------------------------------------*/

    //#region OPEN/CLOSE settings----------------------------------------------------------------------------------------------------------
    function close_settings() {
        if (document.getElementById("settings_div").style.height === "0px") {
            document.getElementById("settings_div").style.height = "550px";
            document.getElementById("settings_div").style.width = "700px";
        } else {
            document.getElementById("settings_div").style.height = "0px";
            document.getElementById("settings_div").style.width = "0px";
        }
    }
    // #endregion ----------------------------------------------------------------------------------------------------------------------

    //#region UPDATE CONTROLLER TO REDIRECT RESPECTIVE FUNCTION BASED ON FIELD VALUE NAME------------------------------------------------------
    function update_service(input_field_name) {
        if (input_field_name === "user_name") {
            let user_name = document.getElementById("user_name").value;

            if (!empty_field_detection(user_name, "username") || !validate(user_name, "NULL", "NULL", "NULL", "username")) {
                return;
            }

            if (api_call_to_update_in_DB(user_name, "user_name") === true) {
                document.getElementById("user_name").value = "";
            }
        }
        else if (input_field_name === "dob") {
            let dob_date = document.getElementById("dob_date").value;
            let dob_month = document.getElementById("dob_month").value;
            let dob_year = document.getElementById("dob_year").value;

            if (!empty_field_detection(dob_date, "birth date") || !empty_field_detection(dob_month, "birth month") ||
                !empty_field_detection(dob_year, "birth year") || !validate("NULL", dob_date, dob_month, dob_year, "birthdate")) {
                return;
            }

            let date_of_birth = dob_date + "." + dob_month + "." + dob_year;
            if (api_call_to_update_in_DB(date_of_birth, "birthdate") === true) {
                document.getElementById("dob_date").value = "";
                document.getElementById("dob_month").value = "";
                document.getElementById("dob_year").value = "";
            }
        }
        else if (input_field_name === "phone") {
            let phone = document.getElementById("phone").value;

            if (!empty_field_detection(phone, "phone number")) {
                return;
            }

            if (api_call_to_update_in_DB(phone, "phone") === true) {
                document.getElementById("phone").value = "";
            }
        }
        else if (input_field_name === "email") {
            let email = document.getElementById("email").value;

            if (!empty_field_detection(email, "email ID")) {
                return;
            }

            if (api_call_to_update_in_DB(email, "email") === true) {
                document.getElementById("email").value = "";
            }
        }
        else if (input_field_name === "password") {
            let password = document.getElementById("password").value;

            if (!empty_field_detection(password, "password")) {
                return;
            }

            if (api_call_to_update_in_DB(password, "password") === true) {
                document.getElementById("password").value = "";
            }
        }
    }


    async function api_call_to_update_in_DB(updated_value, field_name) {
        try {
            let Update_user = {
                updated_value: updated_value,
                field_name: field_name,
                user_name: logged_in_user_name
            }
            console.log(Update_user)

            const response = await fetch('http://localhost:8080/update_user_information', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(Update_user)
            });

            const server_response = await response.text();

            if (server_response[0] === "2") {
                openPopup("Internal server error.", "2");
                return false;
            } else {
                if (field_name === "user_name") {
                    openPopup("Username updated successfully.", "0");
                }
                else if (field_name === "birthdate") {
                    openPopup("Date of birth updated successfully.", "0");
                }
                else if (field_name === "phone") {
                    openPopup("Phone updated successfully.", "0");
                }
                else if (field_name === "email") {
                    openPopup("Email updated successfully.", "0");
                }
                else if (field_name === "password") {
                    openPopup("Password updated successfully.", "0");
                }
                return true;
            }
        } catch (error) {
            openPopup("Internal server error.", "2");
            return false;
        }
    }
    // #endregion ----------------------------------------------------------------------------------------------------------------------------------

    const numberInputInvalidChars = ['-', '+', 'e', 'E', '.'];
    return (
        <>
            {showPopup && <Popup onClose={closePopup} message={popup_message} type={popup_type} />}

            <div className='settings'>
                <div></div>
                <div className='change_info'>
                    <p>Username</p>
                    <input type="text" className="change_input_all" id="user_name"></input>
                    <button onClick={() => update_service("user_name")}>Update</button>
                </div>
                <div className='change_info'>
                    <p>DOB (DD/MM/YYYY)</p>
                    <div className='change_input_birthday'>
                        <input type="number" id="dob_date" onKeyDown={(e) => {
                            if (numberInputInvalidChars.includes(e.key)) {
                                e.preventDefault();
                            }
                        }}></input>
                        <input type="number" id="dob_month" onKeyDown={(e) => {
                            if (numberInputInvalidChars.includes(e.key)) {
                                e.preventDefault();
                            }
                        }}></input>
                        <input type="number" id="dob_year" onKeyDown={(e) => {
                            if (numberInputInvalidChars.includes(e.key)) {
                                e.preventDefault();
                            }
                        }}></input>
                    </div>
                    <button onClick={() => update_service("dob")}>Update</button>
                </div>
                <div className='change_info'>
                    <p>Phone number</p>
                    <input type="number" className="change_input_all" id="phone" onKeyDown={(e) => {
                        if (numberInputInvalidChars.includes(e.key)) {
                            e.preventDefault();
                        }
                    }}></input>
                    <button onClick={() => update_service("phone")}>Update</button>
                </div>
                <div className='change_info'>
                    <p>Email ID</p>
                    <input type="text" id="email" className="change_input_all"></input>
                    <button onClick={() => update_service("email")}>Update</button>
                </div>
                <div className='change_info'>
                    <p>Password</p>
                    <input type="text" id="password" className="change_input_all"></input>
                    <button onClick={() => update_service("password")}>Update</button>
                </div>
                <div className='delete_account'>
                    <button>Delete Account</button>
                </div>

                <div id="settings_close_btn"><FontAwesomeIcon icon={faTimes} onClick={close_settings} /></div>
            </div>
        </>
    );
}

export default Settings;
