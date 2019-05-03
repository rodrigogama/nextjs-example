import Layout from '../components/MyLayout.js'

function Post(props) {
  const { slug } = props;
  return (
    <Layout>
      <h1>{`Slug: ${slug}`}</h1>
    </Layout>
  )
}

Post.getInitialProps = async function(context) {
  const { slug } = context.query;

  return {
    slug
  };
};

export default Post;

