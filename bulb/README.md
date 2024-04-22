# FRONTEND

Components
------------------------
SectionForm
Description
The SectionForm component is responsible for rendering a form for a section of a meeting. It allows users to add, edit, and delete paragraphs within the section.

Props
data: Section - The data for the section containing title, _id, and paragraphs.


MeetingProvider

Description
The MeetingProvider component provides a context for managing the meeting data throughout the application. It wraps the entire application with the MeetingContext, allowing components to access and update the meeting data.

Props
children: ReactNode - The child components wrapped by the MeetingProvider.

MeetingPage

Description
The MeetingPage component represents the meeting page UI where users can view and edit meeting content. It displays the meeting title, date, catalog, and sections with options to add new sections.

AddSection
Description
The AddSection component represents a button to add a new section to the meeting. It toggles a menu to add a new section when clicked.

Props
addSection: Function - Function to add a new section to the meeting.


ParagraphForm
Description
The ParagraphForm component renders a form for adding/editing a paragraph within a section. It allows users to input paragraph text and optionally a title for the paragraph.

Props
data: Paragraph - The data for the paragraph including title, text, and _id.