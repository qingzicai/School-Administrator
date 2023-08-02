 import {createClient} from '@supabase/supabase-js';

    const supabaseUrl = 'https://qdzhecspothfvernvdms.supabase.co';
    const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFkemhlY3Nwb3RoZnZlcm52ZG1zIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4ODA2MDYxMSwiZXhwIjoyMDAzNjM2NjExfQ.0GTDV2EgHtrsGRfEC6c4bizr-iEzGwFWE3aHgoSJq3s';
    const supabase = createClient(supabaseUrl, supabaseKey);
    const addAssignmentForm = document.getElementById('addAssignmentForm')
    const displayAssignmentBtnEL = document.getElementById('displayAssignmentsBtn');

    // Function to add an assignment to the "assignment" table in Supabase
    async function addAssignment(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        const classSelect = document.getElementById('class');
        const assignmentTextarea = document.getElementById('assignment');

        const classValue = classSelect.value;
        const assignmentValue = assignmentTextarea.value;

        try {
            const {data, error} = await supabase
                .from('assignment')
                .insert([{class: classValue, assignment: assignmentValue}]);

            if (error) {
                console.error('Error adding assignment:', error.message);
            } else {
                console.log('Assignment added successfully:', data);

                // Show success message on the page
                const message = document.getElementById('message');
                message.textContent = `New assignment has been added to the class.`;

                // Clear the form after successful submission
                classSelect.value = 'level1A'; // Set default class value
                assignmentTextarea.value = ''; // Clear the assignment text
            }
        } catch (error) {
            console.error('Error adding assignment:', error.message);
            message.textContent = `Three is an error adding assignment.`
        }
    }

    // Add event listener to the form for form submission handling
    addAssignmentForm.addEventListener('submit', addAssignment);

    async function displayAssignments() {
        const displayAssignmentEL= document.getElementById('displayAssignment');

        try {
            const {data: assignments, error} = await supabase
                .from('assignment')
                .select('*');

            if (error) {
                console.error('Error retrieving assignments:', error.message);
            } else {
                console.log('Retrieving assignments successfully:', assignments);

                // Create an array of assignment strings with the desired format using .map
                const assignmentList = assignments.map((assignment) => {
                    return `Class: ${assignment.class}, Assignment: ${assignment.assignment}`;
                });

                // Set the innerHTML of displayAssignmentEL to show the assignments
                displayAssignmentEL.innerHTML = assignmentList.join('<br>');
            }
        } catch (error) {
            console.error('Error retrieving assignments:', error.message);
        }
    }

    // Add event listener to trigger the displayAssignments function when the button is clicked
    displayAssignmentBtnEL.addEventListener('click', displayAssignments);
