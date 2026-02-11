from models.inmuebles import Inmuebles
from flask import jsonify
from sqlalchemy import select
import polars as pl
from typing import Dict



def get_inmuebles(db):
    stmt = select(Inmuebles)
    with db.engine.connect() as conn:
        df = pl.read_database(stmt, conn)
    df = df.with_columns((pl.col("valor_total")*pl.col("pct_propiedad")).alias("valor_efectivo"))
    df_grouped = (df
                        .group_by("fecha_seguimiento")
                        .agg(
                            pl.col("valor_efectivo").sum().alias("importe_total")
                        )).sort("fecha_seguimiento")
    df_with_diff = (
                            df_grouped
                            .with_columns(
                                pl.col("importe_total")
                                .diff()
                                .alias("delta_importe")
                            ).tail(1)
                        )
    print(df_with_diff)
    json_data = df_with_diff.to_dicts()[0]

    return json_data