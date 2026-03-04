import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddBlog from "./AddBlog";

test("<AddBlog /> calls addHandler with the right values", async () => {
  const user = userEvent.setup();
  const addHandler = vi.fn();
  const blog = {
    title: "React patterns",
    author: "Hange Zoë",
    url: "https://titansrwonderful.com/",
    likes: 7,
  };
  render(<AddBlog addHandler={addHandler} />);

  const title = screen.getByLabelText("title");
  const author = screen.getByLabelText("author");
  const url = screen.getByLabelText("url");
  const likes = screen.getByLabelText("likes");
  const addButton = screen.getByText("add");

  await user.type(title, blog.title);
  await user.type(author, blog.author);
  await user.type(url, blog.url);
  await user.type(likes, blog.likes.toString());

  await user.click(addButton);

  expect(addHandler.mock.calls).toHaveLength(1);
  expect(addHandler.mock.calls[0][0].title).toBe(blog.title);
  expect(addHandler.mock.calls[0][0].author).toBe(blog.author);
  expect(addHandler.mock.calls[0][0].url).toBe(blog.url);
  expect(addHandler.mock.calls[0][0].likes).toBe(blog.likes.toString());
});
