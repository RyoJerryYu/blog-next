from typing import Callable, List, Sequence, Union
import manim as mn
import numpy as np

PointType = Union[Sequence[float], np.ndarray]
PointTransformFunction = Callable[[PointType], PointType]


class Basic2DMonoSpace(mn.Scene):
  background_plane: mn.NumberPlane
  plane: mn.NumberPlane
  moving_vectors: List[mn.Vector] = []
  transformable_mobjects: List[mn.Mobject] = []

  def setup(self):
    self.background_plane = mn.NumberPlane(
        color=mn.GRAY,
        axis_config={
            'color': mn.GRAY,
        },
        background_line_style={
            'stroke_color': mn.GRAY,
            'stroke_width': 1,
        },
    )
    self.plane = mn.NumberPlane(
        x_range=np.array([-10, 10, 1.0]),
        y_range=np.array([-10, 10, 1.0]),
        faded_line_ratio=1,
    )
    self.background_plane.add_coordinates()
    self.add(self.background_plane, self.plane)

  def add_vector(self, vector: List | np.ndarray, color=mn.RED, **kwargs):
    v = mn.Vector(vector, color=color)
    self.moving_vectors.append(v)
    self.add(v)
    _ = kwargs

  def add_transformable_mobject(self, *mobjects: mn.Mobject):
    self.transformable_mobjects.append(*mobjects)
    for mobj in mobjects:
      self.add(mobj)

  def anime_apply_matrix(self, matrix: np.ndarray):
    f = self.get_matrix_apply_function(matrix)
    animes = [
        self.anime_apply_function_to_plane(f),
        *self.anime_apply_function_to_vector(f),
        *self.anime_apply_function_to_moving_mobjects(f),
    ]
    return animes

  def anime_apply_function_to_vector(self, func: PointTransformFunction):
    new_vectors = [
        mn.Vector(func(v.get_end()), color=v.color) for v in self.moving_vectors
    ]
    return [
        mn.Transform(old_v, new_v)
        for (old_v, new_v) in zip(self.moving_vectors, new_vectors)
    ]

  def anime_apply_function_to_plane(self, func: PointTransformFunction):
    new_plane = self.plane.copy()
    new_plane.apply_function(func)
    return mn.Transform(self.plane, new_plane)

  def anime_apply_function_to_moving_mobjects(self,
                                              func: PointTransformFunction):
    return [
        mn.ApplyPointwiseFunction(func, mobj)
        for mobj in self.transformable_mobjects
    ]

  def get_matrix_apply_function(self,
                                matrix: np.ndarray) -> PointTransformFunction:
    if matrix.shape == (2, 2):
      new_matrix = np.identity(3)
      new_matrix[:2, :2] = matrix
      matrix = new_matrix
    elif matrix.shape != (3, 3):
      raise ValueError('Matrix has bad dimensions')

    return lambda p: matrix @ p


class OnOneLineWillStillOneLine(Basic2DMonoSpace):
  '''图：在同一直线上的点，经过同一线性变换后还在同一直线上
  '''

  xy_label: mn.MathTex

  def add_vectors_on_line(self, line_fn: Callable[[int], int], start_x: int,
                          end_x: int, color: str):
    to_point = lambda x: [x, line_fn(x)]
    for x in range(start_x, end_x):
      self.add_vector(to_point(x), color=color, animate=False)

    vec_line = mn.Line(
        start=[*to_point(-10), 0], end=[*to_point(10), 0], color=color)
    self.add_transformable_mobject(vec_line)

  def apply_matrix(self, matrix: np.ndarray):
    matrix_mobject = mn.Matrix(
        matrix,
        left_bracket='(',
        right_bracket=')',
    ).next_to(self.xy_label, mn.LEFT)
    self.play(mn.Write(matrix_mobject), run_time=0.5)
    self.wait(0.5)

    label = mn.Group(matrix_mobject, self.xy_label)

    apply_matrix_animes = self.anime_apply_matrix(matrix)
    self.play(
        *apply_matrix_animes,
        mn.Transform(label, self.xy_label),
        run_time=0.5,
    )
    self.wait(0.5)
    self.xy_label = label

  def construct(self):
    self.add_vectors_on_line(lambda x: 2, -1, 3, mn.RED)
    self.add_vectors_on_line(lambda x: x - 2, -1, 3, mn.GREEN)

    self.xy_label = mn.MathTex(r'\begin{pmatrix} x \\ y \end{pmatrix}')
    # label_group = mn.VGroup(label)
    self.add(self.xy_label.to_corner(mn.RIGHT + mn.UP))

    matrix1 = np.array([[2, -1], [0, 1]])
    self.apply_matrix(matrix1)

    matrix2 = np.array([[1 / 2, 1 / 2], [-1 / 2, 1 / 2]])
    self.apply_matrix(matrix2)

    matrix3 = np.linalg.inv(matrix2 @ matrix1)
    self.apply_matrix(matrix3)


class SliceScaleRotateForOrigin(Basic2DMonoSpace):
  '''动图：切边、伸缩、旋转以及其逆变换变回原样
  '''
  xy_label: mn.MathTex

  def apply_matrix(self, matrix: np.ndarray, matrix_display=[]):
    matrix_mobject = mn.Matrix(
        matrix_display if matrix_display else matrix,
        left_bracket='(',
        right_bracket=')',
    ).next_to(self.xy_label, mn.LEFT)
    self.play(mn.Write(matrix_mobject), run_time=0.5)
    self.wait(0.5)

    label = mn.Group(matrix_mobject, self.xy_label)

    apply_matrix_animes = self.anime_apply_matrix(matrix)
    self.play(
        *apply_matrix_animes,
        mn.Transform(label, self.xy_label),
        run_time=0.5,
    )
    self.wait(0.5)
    self.xy_label = label

  def construct(self):
    self.add_vector([1, 0], color=mn.RED, animate=False)
    self.add_vector([0, 1], color=mn.GREEN, animate=False)
    self.xy_label = mn.MathTex(r'\begin{pmatrix} x \\ y \end{pmatrix}')
    # label_group = mn.VGroup(label)
    self.add(self.xy_label.to_corner(mn.RIGHT + mn.UP))

    matrix1 = np.array([[1, 1], [0, 1]])
    self.apply_matrix(matrix1)
    self.apply_matrix(np.linalg.inv(matrix1))

    matrix2 = np.array([[2, 0], [0, 1 / 2]])
    self.apply_matrix(matrix2)
    self.apply_matrix(np.linalg.inv(matrix2))

    angle = np.pi / 3
    matrix3 = np.array([[np.sin(angle), -np.cos(angle)],
                        [np.cos(angle), np.sin(angle)]])
    self.apply_matrix(
        matrix3,
        matrix_display=[[r'\frac{\sqrt{3}}{2}', r'-\frac{1}{2}'],
                        [r'\frac{1}{2}', r'\frac{\sqrt{3}}{2}']])
    self.apply_matrix(
        np.linalg.inv(matrix3),
        matrix_display=[[r'\frac{\sqrt{3}}{2}', r'\frac{1}{2}'],
                        [r'-\frac{1}{2}', r'\frac{\sqrt{3}}{2}']])


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
