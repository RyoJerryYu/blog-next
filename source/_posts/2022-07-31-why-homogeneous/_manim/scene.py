from typing import Callable, Iterable, List, Optional, Protocol, Sequence, Union
import manim as mn
import numpy as np

PointType = Union[Sequence[float], np.ndarray]
PointTransformFunction = Callable[[PointType], PointType]


class SpaceManager(Protocol):

  def get_mobjects(self) -> List[mn.Mobject]:
    ...

  def anime_apply_function_to_plane(
      self, func: PointTransformFunction) -> List[mn.Animation]:
    ...


class Basic2DSpaceManager:
  background_plane: mn.NumberPlane
  plane: mn.NumberPlane

  def __init__(self,
               background_plane: Optional[mn.NumberPlane] = None,
               plane: Optional[mn.NumberPlane] = None):
    if background_plane is None:
      background_plane = mn.NumberPlane(
          color=mn.GRAY,
          axis_config={
              'color': mn.GRAY,
          },
          background_line_style={
              'stroke_color': mn.GRAY,
              'stroke_width': 1,
          },
      )
      background_plane.add_coordinates()

    if plane is None:
      plane = mn.NumberPlane(
          x_range=np.array([-10, 10, 1.0]),
          y_range=np.array([-10, 10, 1.0]),
          faded_line_ratio=1,
      )

    self.background_plane = background_plane
    self.plane = plane

  def get_mobjects(self) -> List[mn.Mobject]:
    return [
        self.background_plane,
        self.plane,
    ]

  def anime_apply_function_to_plane(
      self, func: PointTransformFunction) -> List[mn.Animation]:
    new_plane = self.plane.copy()
    new_plane.apply_function(func)
    return [mn.Transform(self.plane, new_plane)]


class Basic3DSpaceManager:
  background_space: mn.ThreeDAxes

  def __init__(self, background_space: Optional[mn.ThreeDAxes] = None):
    if background_space is None:
      background_space = mn.ThreeDAxes(
          num_axis_pieces=1,
          axis_config={
              'color': mn.GRAY,
              'unit_size': 1,
              'numbers_with_elongated_ticks': [0, 1, 2],
              'stroke_width': 2,
          },
      )
      background_space.add_coordinates()

    self.background_space = background_space

  def get_mobjects(self) -> List[mn.Mobject]:
    return [
        self.background_space,
    ]

  def anime_apply_function_to_plane(
      self, func: PointTransformFunction) -> List[mn.Animation]:
    _ = func
    return []


class LinearTransformManager:
  space_manager: SpaceManager
  moving_vectors: List[mn.Vector] = []
  transformable_mobjects: List[mn.Mobject] = []

  def __init__(self, dimension: int):
    if dimension == 2:
      self.space_manager = Basic2DSpaceManager()
    elif dimension == 3:
      self.space_manager = Basic3DSpaceManager()
    else:
      raise ValueError('Dimension must be 2 or 3')

  def setup(self) -> List[mn.Mobject]:
    return self.space_manager.get_mobjects()

  def add_vector(self, vector: List | np.ndarray, color=mn.RED):
    v = mn.Vector(vector, color=color)
    self.moving_vectors.append(v)
    return v

  def add_transformable_mobject(self, *mobjects: mn.Mobject):
    self.transformable_mobjects.append(*mobjects)
    return mobjects

  def anime_apply_matrix(self, matrix: np.ndarray):
    f = self.get_matrix_apply_function(matrix)
    animes = [
        *self.anime_apply_function_to_plane(f),
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
    return self.space_manager.anime_apply_function_to_plane(func)

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

    if matrix.shape == (3, 3):
      return lambda p: matrix @ p

    if matrix.shape == (4, 4):

      def func(p):
        point_4d = np.append(p, 1)
        point_4d = matrix @ point_4d
        return np.array(point_4d[:3]) / point_4d[3]

      return func

    raise ValueError('Matrix has bad dimensions')


class BasicLinearSpaceScene(mn.ThreeDScene):

  xy_label: mn.MathTex
  mobj_manager: LinearTransformManager

  def setup(self):
    self.mobj_manager = LinearTransformManager(2)
    default_mobj = self.mobj_manager.setup()
    self.add(*default_mobj)
    self.xy_label = mn.MathTex(r'\begin{pmatrix} x \\ y \end{pmatrix}')
    # label_group = mn.VGroup(label)
    self.add(self.xy_label.to_corner(mn.RIGHT + mn.UP))
    return super().setup()

  def play_2d_to_3d(self):
    '''animate 2d space to 3d space, moving xy plane to w = 1
    '''
    old_2d_space = self.mobj_manager.space_manager
    assert isinstance(old_2d_space, Basic2DSpaceManager)

    self.mobj_manager.space_manager = Basic3DSpaceManager()
    self.mobj_manager.add_transformable_mobject(old_2d_space.plane)
    new_axis_animes = [
        mn.Create(axis_mobj)
        for axis_mobj in self.mobj_manager.space_manager.get_mobjects()
    ]

    f = self.mobj_manager.get_matrix_apply_function(
        np.array([
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 0, 1],
        ]))
    animes = [
        *new_axis_animes,
        mn.FadeOut(old_2d_space.background_plane),
        *self.mobj_manager.anime_apply_function_to_vector(f),
        *self.mobj_manager.anime_apply_function_to_moving_mobjects(f),
    ]
    # self.move_camera(
    #     phi=mn.PI / 5, theta=-mn.PI / 3, run_time=2, added_anims=animes)
    self.move_camera(
        phi=mn.PI / 2, theta=-mn.PI / 2, run_time=2, added_anims=animes)

  def add_vector(self, vector: List | np.ndarray, color=mn.RED):
    vector_mobjs = self.mobj_manager.add_vector(vector, color=color)
    self.add(*vector_mobjs)

  def add_transformable_mobject(self, *mobjects: mn.Mobject):
    res_mobjs = self.mobj_manager.add_transformable_mobject(*mobjects)
    self.add(*res_mobjs)

  def apply_matrix(self,
                   matrix: np.ndarray,
                   matrix_display: Optional[Iterable] = None):
    matrix_mobject = mn.Matrix(
        matrix_display if matrix_display else matrix,
        left_bracket='(',
        right_bracket=')',
    ).next_to(self.xy_label, mn.LEFT)
    self.play(mn.Write(matrix_mobject), run_time=0.5)
    self.wait(0.5)

    label = mn.Group(matrix_mobject, self.xy_label)

    apply_matrix_animes = self.mobj_manager.anime_apply_matrix(matrix)
    self.play(
        *apply_matrix_animes,
        mn.Transform(label, self.xy_label),
        run_time=0.5,
    )
    self.wait(0.5)
    self.xy_label = label


class OnOneLineWillStillOneLine(BasicLinearSpaceScene):
  '''图：在同一直线上的点，经过同一线性变换后还在同一直线上
  '''

  def add_vectors_on_line(self, line_fn: Callable[[int], int], start_x: int,
                          end_x: int, color: str):
    to_point = lambda x: [x, line_fn(x)]
    for x in range(start_x, end_x):
      self.add_vector(to_point(x), color=color)

    vec_line = mn.Line(
        start=[*to_point(-10), 0], end=[*to_point(10), 0], color=color)
    self.add_transformable_mobject(vec_line)

  def construct(self):
    self.add_vectors_on_line(lambda x: 2, -1, 3, mn.RED)
    self.add_vectors_on_line(lambda x: x - 2, -1, 3, mn.GREEN)

    matrix1 = np.array([[2, -1], [0, 1]])
    self.apply_matrix(matrix1)

    matrix2 = np.array([[1 / 2, 1 / 2], [-1 / 2, 1 / 2]])
    self.apply_matrix(matrix2)

    matrix3 = np.linalg.inv(matrix2 @ matrix1)
    self.apply_matrix(matrix3)


class SliceScaleRotateForOrigin(BasicLinearSpaceScene):
  '''动图：切边、伸缩、旋转以及其逆变换变回原样
  '''

  def construct(self):
    self.add_vector([1, 0], color=mn.RED)
    self.add_vector([0, 1], color=mn.GREEN)
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


class HomogeneousTransform(BasicLinearSpaceScene):
  '''图：三位坐标w=1平面，三角形
  '''

  def construct(self):
    # ax = mn.ThreeDAxes()
    # lab = ax.get_z_axis_label(mn.Tex('$z$-label'))
    # self.set_camera_orientation(phi=0, theta=-mn.PI / 2)
    triangle = mn.Polygon([-2, 0, 0], [2, 0, 0], [0, 2, 0], color=mn.RED)
    self.add_transformable_mobject(triangle)
    self.play_2d_to_3d()
    self.add_vector([0, 0, 1], color=mn.GREEN)
    self.apply_matrix(np.array([[1, 0, 1], [0, 1, 0], [0, 0, 1]]))
    self.apply_matrix(np.array([[1, 0, -1], [0, 1, -1], [0, 0, 1]]))
    self.apply_matrix(np.array([[1, 0, 0], [0, 1, 1], [0, 0, 1]]))


class SliceInHomogeneousWithOrigin(mn.Scene):
  '''图：三维空间切变，with 向量（0,0,1)的变换
  '''

  def construct(self):
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
    self.add(
        self.background_plane,
        self.plane,
    )


class SliceOnHomogeneousWithGraph(mn.Scene):
  '''图：还是三维空间上切变，平面上有图案
  '''

  def construct(self):
    return super().construct()
