import CommentForm from './comment-form';

const validationSchema = Yup.object({
    text: Yup.string("Enter a title")
        .required(),
});

export default function CommentInput() {
    const classes = formStyles();
    const initialValues = { message: "" };

    const handleSubmit = (values, actions) => {
        actions.setSubmitting(false);
        const { message } = values;

        const comment = new Comment(currentUser.username, message);
        const currentUser = JSON.parse(localStorage.getItem('current-user'));

        CommentService.createComment(songIdeaId, comment);
    }

    return (

    );
} 