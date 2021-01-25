from sqlalchemy import *

metadata = MetaData()

archive = Table('archive', metadata,
                Column('id', Integer, primary_key=True),
                Column('vk_id', Integer, nullable=False),
                Column('bw_image_path', String),
                Column('c_image_path', String)
                )
