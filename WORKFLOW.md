# Workflow Analysis: Lazy vs. Precise Prompting

### 1. Correctness and Edge Cases
In Round One (Lazy Prompting), the AI generated a very generic form. While it functionalized basic state management, it completely missed complex edge cases, such as preventing submission with invalid fields and disabling the submit button. In Round Two (Precise Prompting), by defining strict rules for the password (minimum 6 characters with a number) and email validation, the code handled edge cases robustly right out of the box.

### 2. Accessibility (a11y)
The difference in accessibility was massive. The lazy prompt generated simple inputs with placeholder text but no properly associated `<label>` tags or accessibility attributes. The precise prompt properly utilized `id` matching for labels and added `aria-describedby` to the error messages, making the form fully accessible to screen readers.

### 3. Review and Debugging Effort
Surprisingly, although the precise prompt took slightly longer to write initially, it saved me nearly 15 minutes of manual debugging and refining. The lazy prompt's code required manual fixes to prevent form submission on enter, whereas the precise prompt structure worked perfectly on the first try.

### 4. AI Mistake Caught
During Round One, the AI attempted to validate the email using a highly complex and broken regex that caused a minor syntax crash. In Round Two, by specifying simple, robust constraints, the AI used a standard, clean validation flow.