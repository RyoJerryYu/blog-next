from typing import Callable, List, Union
import manim as mn
import numpy as np


@mn.utils.rate_functions.unit_interval
def make_rate(end: float):

  def func(x):
    return x / end

  return func


class Basic2D(mn.LinearTransformationScene):

  label: mn.MathTex
  matrix_label: mn.MathTex

  def __init__(self):
    super().__init__(
        show_coordinates=True,
        show_basis_vectors=False,
        leave_ghost_vectors=True)


class OnOneLineWillStillOneLine(Basic2D):
  '''图：在同一直线上的点，经过同一线性变换后还在同一直线上
  '''

  def add_vectors_on_line(self, line_fn: Callable[[int], int], start_x: int,
                          end_x: int, color: str):
    to_point = lambda x: [x, line_fn(x)]
    for x in range(start_x, end_x):
      self.add_vector(to_point(x), color=color, animate=False)

    vec_line = mn.Line(
        start=[*to_point(-10), 0], end=[*to_point(10), 0], color=color)
    self.add_transformable_mobject(vec_line)

  def construct(self):
    self.add_vectors_on_line(lambda x: 2, -2, 2, mn.RED)
    self.add_vectors_on_line(lambda x: x - 2, -1, 3, mn.GREEN)

    label = mn.MathTex(r'\begin{pmatrix} x \\ y \end{pmatrix}')
    # label_group = mn.VGroup(label)
    self.add(label.to_corner(mn.RIGHT + mn.UP))

    matrix = np.array([[3, -1], [0, 1]])
    matrix_label = mn.MathTex(r'''
      \begin{pmatrix}
        3 & -1 \\
        0 & 1
      \end{pmatrix}''').next_to(label, mn.LEFT)

    # # label_group = mn.VGroup(label, matrix_label)

    self.apply_matrix(matrix, added_anims=[mn.FadeIn(matrix_label)])
    # label_group = mn.VGroup(label, matrix_label)
    # self.play(mn.FadeTransform(label_group, mn.VGroup(label)))

    # self.add_vectors_on_line(lambda x: x - 2, -1, 3, color=mn.RED_C)
    # self.add_vectors_on_line(lambda x: 2, -2, 2, color=mn.GREEN_C)

    # self.show_all_added()

    # mat: np.ndarray = np.array([[2, 0], [0, 1]])

    # self.apply_matrix(mat)


class SliceScaleRotateForOrigin(Basic2D):
  '''动图：切边、伸缩、旋转以及其逆变换变回原样
  '''

  # def apply_matrix_and_then_invert(self, mat: np.ndarray):
  #   matrix_label = mn.MathTex(
  #       """
  #       \\left(
  #           \\begin{array}{%s}
  #               %d & %d \\\\
  #               %d & %d
  #           \\end{array}
  #       \\right)
  #       """ % tuple(["c" * mat.shape[1]] + list(mat.flatten())),
  #       size="\\Huge",
  #   )
  #   self.apply_matrix(mat, added_anims=[mn.FadeIn(matrix_label)])
  #   self.wait(0.5)
  #   self.apply_inverse(mat, added_anims=[mn.FadeOut(matrix_label)])

  def construct(self):
    label = mn.MathTex(r'\begin{pmatrix} x \\ y \end{pmatrix}')
    # label_group = mn.VGroup(label)
    self.add(label.to_corner(mn.RIGHT + mn.UP))

    matrix = np.array([[1, 1], [0, 1]])
    matrix_label = mn.MathTex(r'''
      \begin{pmatrix}
        1 & 1 \\
        0 & 1
      \end{pmatrix}''').next_to(label, mn.LEFT)

    # # label_group = mn.VGroup(label, matrix_label)

    self.apply_matrix(matrix, added_anims=[mn.FadeIn(matrix_label)])
    # self.wait(0.5)
    self.apply_inverse(matrix, added_anims=[mn.FadeOut(matrix_label)])

    matrix = np.array([[2, 0], [0, 1 / 2]])
    matrix_label2 = mn.MathTex(r'''
      \begin{pmatrix}
        2 & 0 \\
        0 & 1/2
      \end{pmatrix}''').next_to(label, mn.LEFT)
    self.apply_matrix(matrix, added_anims=[mn.FadeIn(matrix_label2)])
    # self.wait(0.5)
    self.apply_inverse(matrix, added_anims=[mn.FadeOut(matrix_label2)])


class HomogeneousTransform(mn.Scene):
  '''图：三位坐标w=1平面，三角形
  '''

  def construct(self):
    return super().construct()


class SliceInHomogeneousWithOrigin(mn.Scene):
  '''图：三维空间切变，with 向量（0,0,1)的变换
  '''

  def construct(self):
    return super().construct()


class SliceOnHomogeneousWithGraph(mn.Scene):
  '''图：还是三维空间上切变，平面上有图案
  '''

  def construct(self):
    return super().construct()
